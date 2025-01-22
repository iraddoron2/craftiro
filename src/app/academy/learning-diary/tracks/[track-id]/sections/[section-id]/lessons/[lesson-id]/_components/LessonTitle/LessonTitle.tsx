'use client'

import { currentUser } from '@/data'
import {
    getLessonFromLessonId,
    getLessonNumberInTrackFromLessonId,
} from '@/helpers'
import { Stack, Text } from '@core'

type Props = {
    lessonId: string
}

export const LessonTitle = ({ lessonId }: Props) => {
    const lesson = getLessonFromLessonId(currentUser, lessonId)

    if (!lesson) {
        return <Text text="Lesson not found" />
    }

    const lessonNumber = getLessonNumberInTrackFromLessonId(
        currentUser,
        lessonId
    )

    return (
        <Stack>
            <Text
                variant="h1"
                sx={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontSize: '48px',
                }}
                text={`שיעור ${lessonNumber}`}
            />
        </Stack>
    )
}
