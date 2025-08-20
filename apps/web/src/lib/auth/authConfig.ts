import { getBaseDomain } from '@/utils'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
