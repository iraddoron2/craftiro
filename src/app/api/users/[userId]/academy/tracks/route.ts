import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const data = await request.json()

    console.log('data', data)

    await connectMongoDB()

    console.log('title', title)

    const pathname = request.url

    // Extract user id from URL (e.g. /admin/users/123/academy
    const userId = pathname.split('/')[3]

    // Get data from request body that comes from a form
    const { test } = await request.json()

    console.log('test', test)

    return NextResponse.json({})
}
