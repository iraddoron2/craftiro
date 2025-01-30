'use client'

import { Stack } from '@core'
import Link from 'next/link'

type Props = {
    contentComponent: React.ReactNode
}
export const ProfileButtonBox = ({ contentComponent }: Props) => {
    return (
        <Stack
            sx={{
                overflow: 'hidden',
                backgroundColor: 'white',
            }}
        >
            <Link href="/sign-in">{contentComponent}</Link>
        </Stack>
    )
}
