'use client'

import { baseColors, elementsColors, elementsSizes } from '@/styles'
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
            className="page-link"
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
    return (
        <Stack
            sx={{
                position: 'fixed',
                borderLeft: `${elementsSizes.divider} solid ${elementsColors.divider}`,
                width: elementsSizes.pagesNavbarWidth,
                height: 'calc(100vh - 60px)',
                backgroundColor: 'ffffffBF',
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
