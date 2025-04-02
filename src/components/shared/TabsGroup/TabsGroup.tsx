'use client'

import { baseColors, elementsSizes } from '@/styles'
import { Stack } from '@core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
    links: {
        href: string
        label: string
    }[]
}

type TabProps = {
    href: string
    label: string
    isActive: boolean
}

const Tab = ({ href, label, isActive }: TabProps) => {
    return (
        <Stack
            className="tab"
            sx={{
                display: 'flex',
                ':hover': {
                    borderBottomColor: baseColors.blue1,
                    color: baseColors.blue1,
                },
                cursor: 'pointer',
                width: '120px',
                height: '44px',
                padding: '0px',
                justifyContent: 'center',
                alignItems: 'center',
                color: isActive ? baseColors.blue1 : baseColors.grey2,
                borderBottomWidth: elementsSizes.divider,
                borderBottomStyle: 'solid',
                borderBottomColor: isActive
                    ? baseColors.blue1
                    : baseColors.grey2,
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
                    color: 'inherit',
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

export const TabsGroup = ({ links }: Props) => {
    const pathname = usePathname()

    return (
        <Stack
            className="tabs-group"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0px',
                width: '100%',
            }}
        >
            {links.map((link) => (
                <Tab
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={pathname === link.href}
                />
            ))}
        </Stack>
    )
}
