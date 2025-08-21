'use client'

import { elementsColors, elementsSizes } from '@/styles'
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
    const [hover, setHover] = useState(false)

    const bg = isActive
        ? hover
            ? 'var(--color-intent-primary-main)'
            : 'var(--color-intent-primary-main)'
        : hover
        ? 'var(--color-intent-primary-subtle)'
        : 'var(--color-background-subtle)'

    const fg = isActive
        ? 'var(--color-intent-primary-on-main)'
        : hover
        ? 'var(--color-intent-primary-on-accent)'
        : 'var(--color-intent-primary-main)'

    return (
        <Stack
            onClick={onClick}
            style={{
                display: 'flex',
                cursor: 'pointer',
                width: '100%',
                height: '52px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Link
                href={href}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                    /* colors */
                    color: fg,
                    backgroundColor: bg,
                    transition:
                        'background-color .2s ease, color .2s ease, border-color .2s ease',
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
                            backgroundColor: 'var(--color-background-main)',
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
                backgroundColor: 'var(--color-background-main)',
                top: '60px',
                right: 0,
                justifyContent: 'flex-start',
                alignItems: 'center',
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
