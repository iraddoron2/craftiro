'use client'

import { elementsColors } from '@/styles'
import { Stack } from '@core'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UnderLine } from './_components'

type Props = {
    boxComponent: React.ReactNode
}

export const MainNavbar = ({ boxComponent }: Props) => {
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
                backgroundColor: '#ffffffBf',
                position: 'fixed',
                padding: '8px 8px',
                borderBottomSize: '2px',
                borderBottomStyle: 'solid',
                borderBottomColor: elementsColors.divider,
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
                    width={32}
                    height={32}
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
            {boxComponent}
        </Stack>
    )
}
