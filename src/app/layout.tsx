import {
    ProfileButtonBox,
    ProfileButtonContent,
} from '@/components/shared/MainNavbar/_components'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { MainNavbar, NextAuthProvider } from '@shared'
import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import { PageContainer } from './_components/'
import './globals.css'

const assistant = Assistant({ subsets: ['hebrew'] })

export const metadata: Metadata = {
    title: 'Craftiro',
    description:
        'ללמוד פסנתר בדרך שמתאימה לכם - קורסים דיגיטליים בפסנתר, מורים פרטיים, שיעורי פסנתר פרונטליים',
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
                            <MainNavbar
                                boxComponent={
                                    <ProfileButtonBox
                                        contentComponent={
                                            <ProfileButtonContent />
                                        }
                                    />
                                }
                            />
                        </header>
                        <PageContainer>{children}</PageContainer>
                    </NextAuthProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
