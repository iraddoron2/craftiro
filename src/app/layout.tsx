import { Stack } from '@core'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { MainNavbar, NextAuthProvider } from '@shared'
import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import './globals.css'

const assistant = Assistant({ subsets: ['hebrew'] })

export const metadata: Metadata = {
    title: 'Craftiro',
    description: 'לימודי מוזיקה, עיצוב גרפי, תכנות בשיעורי אונליין',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="he" dir="rtl">
            <body className={assistant.className}>
                <AppRouterCacheProvider>
                    <NextAuthProvider>
                        <header
                            style={{
                                position: 'relative',
                                zIndex: 100,
                            }}
                        >
                            <MainNavbar />
                        </header>
                        <Stack
                            sx={{
                                marginTop: 'calc(60px + 8px)',
                                marginRight: 'calc(200px + 24px)',
                                marginLeft: 'calc(200px + 24px)',
                            }}
                        >
                            {children}
                        </Stack>
                    </NextAuthProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
