// src/app/api/user/route.ts
import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
    const { email, firstName, lastName, username, academyPlan } =
        await request.json()
    await connectMongoDB()

    try {
        const newUser = await User.create({
            email,
            firstName: firstName || 'שם פרטי',
            lastName: lastName || 'שם משפחה',
            username: username || 'שם משתמש',
            roles: ['user'],
            academy: {
                plan: academyPlan || 'free',
                startingDate: new Date(),
                active: { expiredDate: new Date() },
                learningDiary: { tracks: [] },
                modulesStatus: [],
                musicStudies: { musicPieces: [] },
            },
        })

        return NextResponse.json(
            { message: 'User Registered', user: newUser },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json(
            { message: 'Error registering user', error },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    const sessionCookie = request.cookies.get('session')?.value
    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(sessionCookie, secret)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NextResponse.json({ body: (payload as any).user })
    } catch {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
}
