// src/app/api/assets/[...path]/route.ts

import { promises as fs } from 'fs'
import mime from 'mime'
import { NextResponse } from 'next/server'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Extract [...path] segments directly from the request URL
function getSegmentsFromUrl(url: string): string[] {
    const { pathname } = new URL(url)
    const marker = '/api/assets/'
    const idx = pathname.indexOf(marker)
    const rest = idx >= 0 ? pathname.slice(idx + marker.length) : ''
    return rest ? rest.split('/').filter(Boolean).map(decodeURIComponent) : []
}

export async function GET(req: Request) {
    try {
        const segments = getSegmentsFromUrl(req.url)

        const baseDir = path.resolve(process.cwd(), 'src', 'tempDb', 'assets')
        const requested = path.resolve(baseDir, ...segments)

        // Prevent path traversal
        const rel = path.relative(baseDir, requested)
        if (rel.startsWith('..') || path.isAbsolute(rel)) {
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
        const body = new Uint8Array(file) // BodyInit-safe

        const contentType =
            mime.getType(requested) || 'application/octet-stream'

        return new NextResponse(body, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': String(stat.size),
                'Cache-Control': 'public, max-age=3600, immutable',
            },
        })
    } catch (err) {
        console.error('Assets route error:', err)
        return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }
}
