import { getBaseDomain } from '@/helpers'
import { NextAuthOptions } from 'next-auth'
// import {  User, getServerSession } from 'next-auth'
// import { usSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
// import { PrismaAdapter } from '@next-auth/prisma-adapter'

// import { CredentialsProvider } from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// import prisma from './prisma'

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
