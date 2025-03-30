import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
    console.log('middleware')

    // Extract session cookie
    const sessionCookie = request.cookies.get('session')?.value || ''

    if (!sessionCookie) {
        console.log('No session cookie found, redirecting to sign-in...')
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    try {
        // Decode session cookie (assuming it's a Base64-encoded JSON)
        const decodedSession = JSON.parse(
            Buffer.from(sessionCookie.split('.')[1], 'base64').toString()
        )

        if (!decodedSession || !decodedSession.user) {
            console.log('Invalid session structure, redirecting to sign-in...')
            return NextResponse.redirect(new URL('/sign-in', request.url))
        }

        // Allow only admin with the email iraddodonr2@gmail.com to access
        const userEmail = decodedSession.user.email
        const userRoles = decodedSession.user.roles

        console.log('userEmail', userEmail)
        console.log('userRoles', userRoles)

        if (
            !userRoles.includes('admin') ||
            userEmail !== 'iraddoron2@gmail.com'
        ) {
            console.log('User is not an admin, redirecting to sign-in...')
            return NextResponse.redirect(new URL('/sign-in', request.url))
        } else {
            console.log('User is an admin, continuing...')
        }

        return NextResponse.next()
    } catch (error) {
        console.error('Error decoding session cookie:', error)
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
}

export const config = {
    matcher: ['/admin/:path*'],
}
