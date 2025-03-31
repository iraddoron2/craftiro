'use client'

import { elementsColors } from '@/styles'
import { Stack } from '@core'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavbarLink } from './_components'

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
                ></Stack>
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <NavbarLink
                        isActive={currentMainPage === 'academy'}
                        href="/academy"
                        label="אקדמיה"
                    />
                </Stack>

                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <NavbarLink
                        isActive={currentMainPage === 'admin'}
                        href="/admin"
                        label="מנהל"
                    />
                </Stack>
            </Stack>
            {boxComponent}
        </Stack>
    )
}
