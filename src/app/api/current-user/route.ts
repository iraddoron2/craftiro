import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    await connectMongoDB()

    const token = await getToken({ req: request })

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    const userEmail = token.email

    const user = await User.findOne({ email: userEmail })

    return NextResponse.json({
        body: user,
    })
}
