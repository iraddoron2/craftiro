'use client'

import { Stack } from '@craftiro/ui'
import Link from 'next/link'

type Props = {
    contentComponent: React.ReactNode
}
export const ProfileButtonBox = ({ contentComponent }: Props) => {
    return (
        <Stack
            style={{
                overflow: 'hidden',
                backgroundColor: 'white',
            }}
        >
            <Link href="/sign-in">{contentComponent}</Link>
        </Stack>
    )
}
