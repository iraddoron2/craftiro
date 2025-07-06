'use client'

import { elementsColors } from '@/styles'
import { Stack } from '@core'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NavbarLink } from './_components'

type Props = {
    boxComponent: React.ReactNode
}

export const MainNavbar = ({ boxComponent }: Props) => {
    const pathname = usePathname()
    const currentMainPage = pathname.split('/')[1]

    const [isMobile, setIsMobile] = useState<boolean | null>(null)
    const [isMainMenuOpen, setIsMainMenuOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (isMobile === null) return null

    return (
        <>
            {/* ✅ דסקטופ */}
            {!isMobile && (
                <Stack
                    component="nav"
                    sx={{
                        height: '60px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffffffBF',
                        position: 'fixed',
                        padding: '0 16px',
                        borderBottom: `2px solid ${elementsColors.divider}`,
                        top: 0,
                        zIndex: 1000,
                        gap: '10px',
                    }}
                >
                    {/* לוגו */}
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

                    {/* קישורים */}
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            gap: '24px',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        <NavbarLink
                            isActive={currentMainPage === 'academy'}
                            href="/academy"
                            label="אקדמיה"
                        />
                        <NavbarLink
                            isActive={currentMainPage === 'admin'}
                            href="/admin"
                            label="מנהל"
                        />
                    </Stack>

                    {/* תוספת מימין */}
                    <Stack sx={{ marginRight: 'auto' }}>{boxComponent}</Stack>
                </Stack>
            )}

            {/* ✅ כפתור ☰ — בצד שמאל למעלה */}
            {isMobile && (
                <button
                    onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
                    style={{
                        position: 'fixed',
                        top: 16,
                        left: 16,
                        zIndex: 2000,
                        background: 'none',
                        border: 'none',
                        fontSize: '32px',
                        cursor: 'pointer',
                    }}
                    aria-label="פתח תפריט ראשי"
                >
                    ☰
                </button>
            )}

            {/* ✅ תפריט מוקפץ בצד ימין־עליון — כמו PagesNavbar */}
            {isMobile && isMainMenuOpen && (
                <Stack
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: '#fff',
                        zIndex: 9999,
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px',
                    }}
                >
                    {/* כפתור ✕ לסגירה */}
                    <button
                        onClick={() => setIsMainMenuOpen(false)}
                        style={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            fontSize: '28px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        aria-label="סגור תפריט"
                    >
                        ✕
                    </button>

                    {/* לוגו למעלה במרכז */}
                    <Link
                        href="/"
                        onClick={() => setIsMainMenuOpen(false)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none',
                            marginTop: '40px',
                        }}
                    >
                        <Image
                            src="/icons/LogoColor.svg"
                            alt="Apps Icon"
                            width={32}
                            height={32}
                        />
                        <span
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#333',
                            }}
                        >
                            דף הבית
                        </span>
                    </Link>

                    {/* קישורים */}
                    <NavbarLink
                        isActive={currentMainPage === 'academy'}
                        href="/academy"
                        label="אקדמיה"
                        onClick={() => setIsMainMenuOpen(false)}
                    />
                    <NavbarLink
                        isActive={currentMainPage === 'admin'}
                        href="/admin"
                        label="מנהל"
                        onClick={() => setIsMainMenuOpen(false)}
                    />
                </Stack>
            )}
        </>
    )
}
