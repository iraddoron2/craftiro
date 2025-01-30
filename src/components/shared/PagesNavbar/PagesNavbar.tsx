'use client'

import { LinkGroup } from '@/types'
import { Stack } from '@core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
    links: LinkGroup
}

const PageLink = ({
    path,
    label,
    isActive,
}: {
    path: string
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
            }}
        >
            <Link href={path} style={{ padding: '10px' }}>
                {label}
            </Link>
        </Stack>
    )
}

export const PagesNavbar = ({ links }: Props) => {
    const pathname = usePathname()
    const currentPage = pathname.split('/')[2]
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
            {links.map((link) => {
                return (
                    <PageLink
                        key={link.path}
                        path={link.path}
                        label={link.label}
                        isActive={link.path.split('/')[2] === currentPage}
                    />
                )
            })}
        </Stack>
    )
}
