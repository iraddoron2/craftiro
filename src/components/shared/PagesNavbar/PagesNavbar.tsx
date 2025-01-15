'use client'

import { Stack } from '@core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
}: {
    href: string
    label: string
    isActive: boolean
}) => {
    return (
        <Stack
            sx={{
                borderBottom: '1px solid #0000001F',
                ':hover': {
                    backgroundColor: isActive ? '#2266C7' : '#2266C70F',
                },
                backgroundColor: isActive ? '#2266C7' : 'transparent',
                color: isActive ? 'white' : 'black',
                cursor: 'pointer',
                zIndex: 100,
            }}
        >
            <Link href={href} style={{ padding: '10px' }}>
                {label}
            </Link>
        </Stack>
    )
}

export const PagesNavbar = ({ links }: Props) => {
    const pathname = usePathname()
    const currentPage = pathname.split('/')[2]
    console.log('currentPage', currentPage)
    return (
        <Stack
            sx={{
                position: 'fixed',
                boxShadow: '0px 8px 8px 1px rgba(0, 0, 0, 0.10)',
                width: '200px',
                height: 'calc(100vh - 60px)',
                backgroundColor: 'ffffffBF',
                top: '60px',
                right: 0,
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
