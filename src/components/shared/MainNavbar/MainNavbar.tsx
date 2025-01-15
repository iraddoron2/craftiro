'use client'

import { Stack } from '@core'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const UnderLine = ({ isActive }: { isActive: boolean }) => (
    <div
        style={{
            position: 'relative',
            bottom: -8,
            width: '100%',
            height: '4px',
            marginBottom: '-4px',
            backgroundColor: isActive ? '#2266C7' : 'transparent',
        }}
    />
)

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
                backgroundColor: 'ffffffBF',
                position: 'sticky',
                padding: '0 16px',
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
            <Image
                src={'/images/DemoProfile.png'}
                alt="Apps Icon"
                width={46}
                height={46}
            />
        </Stack>
    )
}
