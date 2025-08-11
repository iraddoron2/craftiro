import { promises as fs } from 'fs'
import mime from 'mime'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(req: NextRequest, context: unknown) {
    try {
        // Narrow the context shape safely at runtime
        const params = (context as { params?: { path?: string[] | string } })
            ?.params
        const raw = params?.path
        const segments = Array.isArray(raw)
            ? raw
            : typeof raw === 'string'
            ? [raw]
            : []

        const baseDir = path.resolve(process.cwd(), 'src', 'tempDb', 'assets')
        const requested = path.resolve(
            baseDir,
            ...segments.map(decodeURIComponent)
        )

        // Prevent path traversal
        if (!requested.startsWith(baseDir + path.sep)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const stat = await fs.stat(requested).catch(() => null)
        if (!stat || !stat.isFile()) {
            return NextResponse.json(
                { error: 'Asset not found' },
                { status: 404 }
            )
        }

        const file = await fs.readFile(requested)
        const contentType =
            mime.getType(requested) || 'application/octet-stream'

        return new NextResponse(file, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600, immutable',
            },
        })
    } catch (err) {
        console.error('Assets route error:', err)
        return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }
}

// If needed to avoid static optimization for assets:
// export const dynamic = 'force-dynamic'
