import { NextAuthOptions } from 'next-auth'
// import {  User, getServerSession } from 'next-auth'
// import { usSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'

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
}
