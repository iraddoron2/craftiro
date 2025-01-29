'use client'

import { Stack } from '@core'
import Link from 'next/link'
import { UserProfileImage } from '../UserProfileImage'

export const UserProfileImageBox = () => {
    return (
        <Stack
            sx={{
                overflow: 'hidden',
                backgroundColor: 'white',
            }}
        >
            <Link href="/sign-in">
                <UserProfileImage />
            </Link>
        </Stack>
    )
}
