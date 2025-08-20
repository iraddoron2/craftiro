'use client'

import { Stack, Text } from '@craftiro/ui'
import Link from 'next/link'

type MainLinkButtonProps = {
    label: string
    url: string
}

export const MainLinkButton = ({ label, url }: MainLinkButtonProps) => {
    return (
        <Stack
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                width: 'fit-content',
                minWidth: '160px',
                backgroundColor: '#F5F5F5',
                color: 'black',
                borderRadius: '8px',
                boxShadow: '0px 6px 2px 1px rgba(0, 0, 0, 0.10)',
                cursor: 'pointer',
            }}
        >
            <Link href={url}>
                <Text>{label}</Text>
            </Link>
        </Stack>
    )
}
