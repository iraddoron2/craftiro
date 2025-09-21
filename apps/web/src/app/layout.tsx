import { MainNavbar } from '@/components/navigation'
import {
    ProfileButtonBox,
    ProfileButtonContent,
} from '@/components/navigation/main-navbar/_components'
import { NextAuthProvider } from '@/components/shared'
import { CraftiroCoursesProvider, CraftiroExercisesProvider } from '@/providers'
import { UserStoreProvider } from '@/providers/UserStoreProvider'
import '@craftiro/design-tokens/dist/css/vars.dark.css'
import '@craftiro/design-tokens/dist/css/vars.light.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import '../../globals.css'

// import { PageContainer } from './_components/'

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
        <html lang="he" dir="rtl" data-theme="light">
            <body
                className={assistant.className + ' m-0'}
                style={{
                    margin: '0px !important',
                    backgroundColor: 'var(--color-brand-pink-190)',
                }}
            >
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
                                    {/* <PageContainer>{children}</PageContainer> */}
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'relative',
                                        }}
                                    >
                                        {children}
                                    </div>
                                </CraftiroExercisesProvider>
                            </CraftiroCoursesProvider>
                        </UserStoreProvider>
                    </NextAuthProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
