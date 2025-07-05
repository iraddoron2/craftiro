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
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        position: 'fixed',
                        top: 16,
                        left: 16,
                        zIndex: 2000,
                        background: 'none',
                        border: 'none',
                        fontSize: '28px',
                        cursor: 'pointer',
                    }}
                    aria-label="פתח תפריט ראשי"
                >
                    ☰
                </button>
            )}

            {/* ✅ תפריט מוקפץ בצד ימין־עליון — כמו PagesNavbar */}
            {isMobile && isMenuOpen && (
                <Stack
                    sx={{
                        position: 'fixed',
                        top: '60px',
                        left: 16, // ⬅️ שינוי מ-right: 16
                        backgroundColor: '#fff',
                        border: `1px solid ${elementsColors.divider}`,
                        borderRadius: '12px',
                        padding: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        gap: '12px',
                        zIndex: 1999,
                        minWidth: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* לוגו וקישורים כמו קודם */}
                    <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none',
                        }}
                    >
                        <Image
                            src="/icons/LogoColor.svg"
                            alt="Apps Icon"
                            width={24}
                            height={24}
                        />
                        <span
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#333',
                            }}
                        >
                            דף הבית
                        </span>
                    </Link>

                    <NavbarLink
                        isActive={currentMainPage === 'academy'}
                        href="/academy"
                        label="אקדמיה"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <NavbarLink
                        isActive={currentMainPage === 'admin'}
                        href="/admin"
                        label="מנהל"
                        onClick={() => setIsMenuOpen(false)}
                    />
                </Stack>
            )}
        </>
    )
}
