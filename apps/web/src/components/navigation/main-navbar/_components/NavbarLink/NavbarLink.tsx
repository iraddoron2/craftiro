'use client'

import clsx from 'clsx'
import Link from 'next/link'
import type { CSSProperties, MouseEvent } from 'react'

type Props = {
    isActive: boolean
    href: string
    label: string
    onClick?: () => void
}

/**
 * NavbarLink מבוסס תמות:
 * - active/hover: color.intent.primary.{subtle, on-subtle, main}
 * - idle:        color.text.on-background
 */
export const NavbarLink = ({ isActive, href, label, onClick }: Props) => {
    // שמות הטוקנים ב־kebab-case כפי שנוצרו מ־Style Dictionary
    const vars = {
        activeBg: 'var(--color-intent-primary-subtle)',
        activeText: 'var(--color-text-on-background)',
        activeBorder: 'var(--color-intent-primary-main)',

        idleText: 'var(--color-text-on-background)',
        hoverBg: 'var(--color-intent-primary-subtle)',
        hoverBorder: 'var(--color-intent-primary-main)',
    } as const

    const baseStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        fontSize: '16px',
        fontFamily: 'inherit',
        fontWeight: 700,

        width: '100px',
        height: '40px',
        borderRadius: '12px',

        // לא shorthand כדי ש-var יעבוד חלק
        borderStyle: 'solid',
        borderWidth: '2px',

        textDecoration: 'none',
        transition:
            'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
        cursor: 'pointer',

        // צבעים לפי מצב
        color: isActive ? vars.activeText : vars.idleText,
        backgroundColor: isActive ? vars.activeBg : 'transparent',
        borderColor: isActive ? vars.activeBorder : 'transparent',

        opacity: isActive ? 1 : 0.85,
    }

    // Hover / Focus רק כשהקישור לא אקטיבי
    const applyHover = (el: HTMLElement) => {
        el.style.backgroundColor = vars.hoverBg
        el.style.borderColor = vars.hoverBorder
    }
    const clearHover = (el: HTMLElement) => {
        el.style.backgroundColor = 'transparent'
        el.style.borderColor = 'transparent'
    }

    const handleEnter = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!isActive) applyHover(e.currentTarget)
    }
    const handleLeave = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!isActive) clearHover(e.currentTarget)
    }
    const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
        if (!isActive) applyHover(e.currentTarget)
    }
    const handleBlur = (e: React.FocusEvent<HTMLAnchorElement>) => {
        if (!isActive) clearHover(e.currentTarget)
    }

    return (
        <Link
            href={href}
            onClick={onClick}
            className={clsx('crt-navbar-link')}
            style={baseStyle}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {label}
        </Link>
    )
}
