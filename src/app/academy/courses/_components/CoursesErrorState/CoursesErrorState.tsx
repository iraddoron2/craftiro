'use client'

import { Stack, Text } from '@core'

export const CoursesErrorState = ({ message }: { message: string }) => (
    <Stack>
        <Text text={`שגיאה בטעינת קורסים: ${message}`} />
    </Stack>
)
