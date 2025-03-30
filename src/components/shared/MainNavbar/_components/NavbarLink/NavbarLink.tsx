'use client'

import { baseColors } from '@/styles'
import Link from 'next/link'

type Props = {
    isActive: boolean
    href: string
    label: string
}

export const NavbarLink = ({ isActive, href, label }: Props) => {
    return (
        <Link
            href={href}
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
                width: '120px',
                height: '40px',
            }}
        >
            {label}
        </Link>
    )
}
