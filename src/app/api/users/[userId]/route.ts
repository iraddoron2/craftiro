import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    await connectMongoDB()

    const pathname = request.url

    // Extract user id from URL (e.g. /users/123)
    const userId = pathname.split('/').pop()

    const user = await User.findOne({ _id: userId })

    return NextResponse.json({
        body: user,
    })
}

export async function PUT(request: NextRequest) {
    await connectMongoDB()

    const pathname = request.url

    // Extract user id from URL (e.g. /users/123)
    const userId = pathname.split('/').pop()

    const { email, firstName, lastName, username, academyPlan } =
        await request.json()

    const user = await User.findOneAndUpdate(
        { _id: userId },
        {
            email,
            firstName,
            lastName,
            username,
            academy: {
                plan: academyPlan,
            },
        }
    )

    return NextResponse.json({
        body: user,
    })
}
