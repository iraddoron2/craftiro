'use client'

import { baseColors, elementsColors, elementsSizes } from '@/styles'
import { Stack } from '@core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
    links: {
        href: string
        label: string
    }[]
}

const PageLink = ({
    href,
    label,
    isActive,
    onClick,
}: {
    href: string
    label: string
    isActive: boolean
    onClick?: () => void
}) => {
    return (
        <Stack
            className="page-link"
            onClick={onClick}
            sx={{
                display: 'flex',
                ':hover': {
                    backgroundColor: isActive ? '#2266C7' : '#2266C70F',
                },
                cursor: 'pointer',
                width: '232px',
                height: '40px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
            }}
        >
            <Link
                href={href}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontFamily: 'Assistant',
                    fontWeight: 'bold',
                    border: '2px solid',
                    color: isActive ? baseColors.blue1 : '#696969',
                    borderColor: isActive ? baseColors.blue8 : '#00000000',
                    backgroundColor: isActive ? baseColors.blue6 : '#00000000',
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    textDecoration: 'none',
                }}
            >
                {label}
            </Link>
        </Stack>
    )
}

export const PagesNavbar = ({ links }: Props) => {
    const pathname = usePathname()
    const currentPage = pathname.split('/')[2]

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

    if (isMobile) {
        return (
            <>
                {/* כפתור המבורגר - תמיד מוצג */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        position: 'fixed',
                        top: 16,
                        right: 16,
                        zIndex: 9999,
                        background: 'none',
                        border: 'none',
                        fontSize: '32px',
                        cursor: 'pointer',
                    }}
                    aria-label="תפריט דפים"
                >
                    ☰
                </button>

                {/* תפריט נפתח - רק כשה-isMenuOpen true */}
                {isMenuOpen && (
                    <Stack
                        sx={{
                            position: 'fixed',
                            top: '60px',
                            right: 0,
                            backgroundColor: '#fff',
                            border: `1px solid ${elementsColors.divider}`,
                            borderRadius: '12px 0 0 12px',
                            padding: '12px',
                            boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
                            gap: '8px',
                            zIndex: 1500,
                        }}
                    >
                        {links.map((link) => (
                            <PageLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                isActive={
                                    link.href.split('/')[2] === currentPage
                                }
                                onClick={() => setIsMenuOpen(false)}
                            />
                        ))}
                    </Stack>
                )}
            </>
        )
    }

    // תפריט צד בדסקטופ
    return (
        <Stack
            sx={{
                position: 'fixed',
                borderLeft: `${elementsSizes.divider} solid ${elementsColors.divider}`,
                width: elementsSizes.pagesNavbarWidth,
                height: 'calc(100vh - 60px)',
                backgroundColor: '#ffffffBF',
                top: '60px',
                right: 0,
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '10px',
            }}
        >
            {links.map((link) => (
                <PageLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={link.href.split('/')[2] === currentPage}
                />
            ))}
        </Stack>
    )
}
