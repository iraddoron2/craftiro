'use client'

import { Stack, Text } from '@craftiro/ui'

export const CoursesErrorState = ({ message }: { message: string }) => (
    <Stack>
        <Text>שגיאה בטעינת קורסים: {message}</Text>
    </Stack>
)
