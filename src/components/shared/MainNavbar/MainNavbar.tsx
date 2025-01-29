'use client'

import { Stack } from '@core'
import Image from 'next/image'
import Link from 'next/link'
import { UnderLine, UserProfileImageBox } from './_components'

export const MainNavbar = () => {
    // const currentMainPage = pathname.split('/')[1]

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
