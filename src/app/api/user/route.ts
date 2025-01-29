import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { email, firstName, lastName, username, academyPlan } =
        await request.json()

    // Connect to MongoDB
    await connectMongoDB()

    try {
        // Create a new user based on the schema
        const newUser = await User.create({
            email,
            firstName: firstName || 'שם פרטי',
            lastName: lastName || 'שם משפחה',
            username: username || 'שם משתמש',
            roles: ['user'], // Default role
            academy: {
                plan: academyPlan || 'free', // Default to 'free' if no plan is provided
                startingDate: new Date(),
                active: {
                    expiredDate: new Date(), // Default expiration date
                },
                learningDiary: {
                    tracks: [], // Empty by default
                },
                modulesStatus: [], // Empty by default
                musicStudies: {
                    musicPieces: [], // Empty by default
                },
            },
        })

        return NextResponse.json(
            { message: 'User Registered', user: newUser },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json(
            { message: 'Error registering user', error: error },
            { status: 500 }
        )
    }
}

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
