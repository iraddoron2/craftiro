'use client'

import { baseColors, elementsColors, elementsSizes } from '@/styles'
import { Stack } from '@craftiro/ui'
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
            onClick={onClick}
            style={{
                display: 'flex',
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
                    transition: 'background-color 0.2s ease',
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
    const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false)

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
                {/* ☰ כפתור המבורגר */}
                {isMobile && (
                    <button
                        onClick={() => setIsPagesMenuOpen(!isPagesMenuOpen)}
                        style={{
                            position: 'fixed',
                            top: 16,
                            right: 16,
                            zIndex: 4000,
                            background: 'none',
                            border: 'none',
                            fontSize: '32px',
                            cursor: 'pointer',
                        }}
                        aria-label={
                            isPagesMenuOpen ? 'סגור תפריט צד' : 'פתח תפריט צד'
                        }
                    >
                        {isPagesMenuOpen ? '✕' : '☰'}
                    </button>
                )}

                {/* תפריט מסך מלא */}
                {isPagesMenuOpen && (
                    <Stack
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: '#fff',
                            zIndex: 3000,
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '24px',
                        }}
                    >
                        {/* קישורים */}
                        {links.map((link) => (
                            <PageLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                isActive={
                                    link.href.split('/')[2] === currentPage
                                }
                                onClick={() => setIsPagesMenuOpen(false)}
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
            style={{
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
