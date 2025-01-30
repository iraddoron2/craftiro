'use client'

import { Stack, Text } from '@core'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UnderLine } from './_components'

export const SignInProfileImage = () => {
    return (
        <Stack
            sx={{
                borderRadius: '500px',
                padding: '10px',
                overflow: 'hidden',
                backgroundColor: 'white',
                border: '3px solid #2266C7',
                '&:hover': {
                    backgroundColor: '#2266C7',
                    cursor: 'pointer',
                    color: 'white',
                },
            }}
        >
            <Text text="כניסה" />
        </Stack>
    )
}

export const UserProfileImage = () => {
    const { status, data: session } = useSession()

    if (status === 'authenticated') {
        const userProfileImage = session?.user?.image as string
        return (
            <Stack
                sx={{
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={userProfileImage}
                    alt="Apps Icon"
                    width={46}
                    height={46}
                />
            </Stack>
        )
    }

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <SignInProfileImage />
    }

    return null
}

export const UserProfileImageBox = () => {
    return (
        <Stack
            sx={{
                overflow: 'hidden',
                backgroundColor: 'white',
            }}
        >
            <Link href="/sign-in">
                <UserProfileImage />
            </Link>
        </Stack>
    )
}

export const MainNavbar = () => {
    const pathname = usePathname()
    const currentMainPage = pathname.split('/')[1]

    return (
        <Stack
            component={'nav'}
            sx={{
                height: '60px',
                width: '100%',
                display: 'flex',
                gap: '10px',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 0px 8px 1px rgba(0, 0, 0, 0.10)',
                backgroundColor: '#ffffffBf',
                position: 'fixed',
                padding: '0 16px',
                top: 0,
            }}
        >
            <Link
                href="/"
                style={{
                    display: 'flex',
                    position: 'relative',
                    gap: '10px',
                    justifySelf: 'flex-start',
                    marginLeft: 'auto',
                }}
            >
                <Image
                    src={'/icons/LogoColor.svg'}
                    alt="Apps Icon"
                    width={60}
                    height={60}
                />
            </Link>

            <Stack
                sx={{
                    flexDirection: 'row',
                    gap: '24px',
                    justifyContent: 'center',
                    position: 'relative',
                    marginLeft: 'auto',
                }}
            >
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Link
                        href="/apps"
                        style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            src={'/icons/AppsIcon.svg'}
                            alt="Apps Icon"
                            width={30}
                            height={30}
                        />
                        אפליקציות
                    </Link>
                    <UnderLine isActive={currentMainPage === 'apps'} />
                </Stack>
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Link
                        href="/academy"
                        style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            src={'/icons/AcademyIcon.svg'}
                            alt="Apps Icon"
                            width={30}
                            height={30}
                        />
                        אקדמיה
                    </Link>
                    <UnderLine isActive={currentMainPage === 'academy'} />
                </Stack>

                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Link
                        href="/services"
                        style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            src={'/icons/ServicesIcon.svg'}
                            alt="Apps Icon"
                            width={30}
                            height={30}
                        />
                        שירותים
                    </Link>
                    <UnderLine isActive={currentMainPage === 'services'} />
                </Stack>
            </Stack>

            <UserProfileImageBox />
        </Stack>
    )
}
