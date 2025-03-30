'use client'

import { User } from '@/types'
import { Stack, Text } from '@core'
import Link from 'next/link'

type Props = {
    user: User
}

export const CustomerLink = ({ user }: Props) => {
    const { _id, firstName, lastName } = user

    return (
        <Link href={`/admin/users/${_id}`} passHref>
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    backgroundColor: '#F2F2F2',
                    borderRadius: '1000px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    boxShadow: '0px 6px 2px 1px rgba(0, 0, 0, 0.10);',
                    cursor: 'pointer',
                    gap: '16px',
                    '&:hover': {
                        backgroundColor: '#EAEAEA',
                        boxShadow: '0px 6px 2px 1px rgba(0, 0, 0, 0.20);',
                    },
                }}
            >
                <Text text={`${firstName} ${lastName}`} />
                <Text text={`${_id}`} />
            </Stack>
        </Link>
    )
}
