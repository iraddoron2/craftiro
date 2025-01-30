'use client'

import { Stack, Text } from '@core'
import Link from 'next/link'

type MainLinkButtonProps = {
    label: string
    path: string
}

export const MainLinkButton = ({ label, path }: MainLinkButtonProps) => {
    return (
        <Stack
            sx={{
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
                ':hover': {
                    backgroundColor: '#2266C70F',
                },
            }}
        >
            <Link href={path}>
                <Text text={label} />
            </Link>
        </Stack>
    )
}
