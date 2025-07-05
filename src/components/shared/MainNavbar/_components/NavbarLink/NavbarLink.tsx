'use client'

import { baseColors } from '@/styles'
import Link from 'next/link'

type Props = {
    isActive: boolean
    href: string
    label: string
    onClick?: () => void
}

export const NavbarLink = ({ isActive, href, label, onClick }: Props) => {
    return (
        <Link
            href={href}
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontFamily: 'Assistant',
                borderRadius: '12px',
                fontWeight: 'bold',
                border: '2px solid',
                color: isActive ? baseColors.blue1 : '#696969',
                borderColor: isActive ? baseColors.blue8 : '#00000000',
                backgroundColor: isActive ? baseColors.blue6 : '#00000000',
                width: '100%',
                height: '40px',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#2266C70F'
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#00000000'
                }
            }}
        >
            {label}
        </Link>
    )
}
