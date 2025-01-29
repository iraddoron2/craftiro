import User from '@/models/user'
import { Academy, User as UserType } from '@/types'
import { getBaseDomain } from '@/utils'
import argon2 from 'argon2'
import { SignJWT, jwtVerify } from 'jose'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { connectMongoDB } from './mongodb'

const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

const academyDefaultObject = {
    startingDate: null,
    plan: 'free',
    active: {
        expiredDate: null,
    },
    learningDiary: {
        tracks: [],
    },
    modulesStatus: [],
    musicStudies: {
        musicPieces: [],
    },
} as Academy

const defaultRolesArray = ['user']

export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            const baseDomain = getBaseDomain()

            if (account?.provider === 'google') {
                const { name, email } = user
                try {
                    const res = await fetch(`${baseDomain}/api/user`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                        }),
                    })

                    if (res.ok) {
                        return true
                    }
                } catch (error) {
                    console.error('Error creating user', error)
                    return false
                }
            }

            return true
        },
    },
}

const secretJwt = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretJwt)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encrypt = async (payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Date.now() + 10 * day)
        .sign(key)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decrypt = async (input: string): Promise<any> => {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    })
    return payload
}

export const login = async (formData: FormData) => {
    console.log('login function')
    // Get user email and password from the form data
    const userLoginInfo = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    // Check if the user exists in the database
    await connectMongoDB()
    const user = await User.findOne({ email: userLoginInfo.email })
    console.log('user from login', user)

    // Redirect to the sign-in page if the user doesn't exist
    if (!user) {
        redirect('/sign-in')
    }

    // Check if the password is correct
    const passwordCorrect = await argon2.verify(
        user.hashedPassword,
        userLoginInfo.password
    )

    // Redirect to the sign-in page if the password is incorrect
    if (!passwordCorrect) {
        redirect('/sign-in')
    }

    // Create the session
    const expires = new Date(Date.now() + 10 * day)
    const session = await encrypt({ user, expires })

    // Save the session in a cookie
    ;(
        await // Save the session in a cookie
        cookies()
    ).set('session', session, { expires, httpOnly: true })
}

export const signUp = async (formData: FormData) => {
    // Get user email from the form data
    const userEmail = formData.get('email')
    console.log('userEmail', userEmail)

    // Check if the user already exists
    await connectMongoDB()
    const userFromDatabase = await User.findOne({ email: userEmail })
    console.log('userFromDatabase', userFromDatabase)
    if (userFromDatabase) {
        redirect('/sign-in')
    }

    // Create new hashed password
    const password = formData.get('password') as string
    const hashedPassword = await argon2.hash(password)
    console.log('hashedPassword', hashedPassword)

    // Create a new user based on the schema and the form data
    const user = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        username: formData.get('username'),
        email: userEmail,
        hashedPassword: hashedPassword,
        roles: defaultRolesArray,
        academy: academyDefaultObject,
    } as unknown as UserType
    console.log('user before create new user in mongo', user)

    // Save the user in the database
    await User.create(user)

    // Create the session
    const expires = new Date(Date.now() + 10 * day)
    console.log('expires', expires)
    const session = await encrypt({ user, expires })
    console.log('session', session)

    // Save the session in a cookie
    ;(
        await // Save the session in a cookie
        cookies()
    ).set('session', session, { expires, httpOnly: true })
}

export const logout = async () => {
    // Destroy the session
    ;(
        await // Destroy the session
        cookies()
    ).set('session', '', { expires: new Date(0) })
}

export const getSession = async () => {
    const session = (await cookies()).get('session')?.value
    console.log('session', session)

    if (!session) return null
    return await decrypt(session)
}

export const updateSession = async (request: NextRequest) => {
    const session = request.cookies.get('session')?.value
    if (!session) return

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 10 * 1000)
    const res = NextResponse.next()
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    })

    return res
}
