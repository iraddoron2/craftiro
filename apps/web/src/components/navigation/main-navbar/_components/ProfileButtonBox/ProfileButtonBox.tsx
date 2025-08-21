'use client'

import { Stack } from '@craftiro/ui'
import Link from 'next/link'

type Props = {
    contentComponent: React.ReactNode
}
export const ProfileButtonBox = ({ contentComponent }: Props) => {
    console.log('ProfileButtonBox rendered') // Debugging log to check if the component is rendered
    console.log('Content Component:', contentComponent) // Log the content component to see what is being passed
    return (
        <Stack
            style={{
                overflow: 'hidden',
                backgroundColor: 'var(--color-background-main)',
                borderRadius: '500px',
            }}
        >
            <Link href="/sign-in">{contentComponent}</Link>
        </Stack>
    )
}
