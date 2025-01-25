import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { name, email } = await request.json()
    await connectMongoDB()
    // Create a new user in database called "prod" in a collection called "users"

    await User.create({ name, email })
    return NextResponse.json({ message: 'User Registered' }, { status: 201 })
}
