import {
    ProfileButtonBox,
    ProfileButtonContent,
} from '@/components/shared/MainNavbar/_components'
import { CraftiroCoursesProvider, CraftiroExercisesProvider } from '@/providers'
import { UserStoreProvider } from '@/providers/UserStoreProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { MainNavbar, NextAuthProvider } from '@shared'
import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import { PageContainer } from './_components/'
import './globals.css'

// Load Google font
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
                        <UserStoreProvider>
                            <CraftiroCoursesProvider>
                                <CraftiroExercisesProvider>
                                    {/* Header */}
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

                                    {/* Main content */}
                                    <PageContainer>{children}</PageContainer>
                                </CraftiroExercisesProvider>
                            </CraftiroCoursesProvider>
                        </UserStoreProvider>
                    </NextAuthProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
