'use client'

import { Stack } from '@core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
            }}
        >
            <Link href={href} style={{ padding: '10px' }}>
                {label}
            </Link>
        </Stack>
    )
}

type Link = {
    href: string
    label: string
}

type TabsDict = {
    [key: string]: Link[][] | undefined
}

const getAcademyTabsLinks = (path: string) => {
    const tabsDict = {
        '/academy': [[]],
        '/academy/learning-diary': [
            [
                { href: '/academy/learning-diary', label: 'מסך ראשי' },
                {
                    href: '/academy/learning-diary/full-diary',
                    label: 'יומן מלא',
                },
                {
                    href: '/academy/learning-diary/tracks-in-progress',
                    label: 'מסלולים בתהליך',
                },
            ],
        ],
        '/academy/learning-diary/full-diary': [
            [
                { href: '/academy/learning-diary', label: 'מסך ראשי' },
                {
                    href: '/academy/learning-diary/full-diary',
                    label: 'יומן מלא',
                },
                {
                    href: '/academy/learning-diary/tracks-in-progress',
                    label: 'מסלולים בתהליך',
                },
            ],
        ],
        '/academy/learning-diary/tracks-in-progress': [
            [
                { href: '/academy/learning-diary', label: 'מסך ראשי' },
                {
                    href: '/academy/learning-diary/full-diary',
                    label: 'יומן מלא',
                },
                {
                    href: '/academy/learning-diary/tracks-in-progress',
                    label: 'מסלולים בתהליך',
                },
            ],
        ],
        '/academy/syllabus': [[]],
        '/academy/objectives': [[]],
        '/academy/moduls': [[]],
        '/academy/games': [[]],
        '/academy/online-lessons': [[]],
        '/academy/goals': [[]],
        '/academy/books': [[]],
        '/academy/courses': [[]],
        '/academy/blinks': [[]],
        '/academy/certificates': [[]],
        '/academy/stats': [[]],
        '/academy/requests': [[]],
        '/academy/plan': [[]],
    } as TabsDict

    return tabsDict[path] || []
}

const Divider = () => {
    return (
        <Stack
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Stack
                sx={{
                    height: '2px',
                    backgroundColor: '#000000',
                    margin: '24px 0',
                    width: 'calc(100% - 32px)',
                }}
            />
        </Stack>
    )
}

export const TabsNavbar = () => {
    const pathname = usePathname()
    const linksGroups = getAcademyTabsLinks(pathname)

    return (
        <Stack
            sx={{
                position: 'fixed',
                boxShadow: '0px 8px 8px 1px rgba(0, 0, 0, 0.10)',
                width: '200px',
                height: 'calc(100vh - 60px)',
                backgroundColor: 'ffffffBF',
                top: '60px',
                left: 0,
            }}
        >
            {linksGroups.map((links, index, arr) => (
                <Stack key={index}>
                    {links.map((link) => (
                        <PageLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            isActive={pathname === link.href}
                        />
                    ))}

                    {index < arr.length - 1 && <Divider />}
                </Stack>
            ))}
        </Stack>
    )
}
