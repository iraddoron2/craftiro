import { Stack } from '@core'
import Link from 'next/link'

export const TabLink = ({
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
