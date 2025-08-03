'use client'

import { useCraftExercises } from '@/context/craftExercisesContext'
import { CraftTextSegment } from '@/types'
import { Stack, Text } from '@core'
import { Paragraph as CraftParagraph } from '@craftElements/base/Paragraph'
import { useParams } from 'next/navigation'
import { ExerciseDetailCard } from '../../_components'

export default function Page() {
    // קבלת כל התרגילים מהקונטקסט
    const { exercises } = useCraftExercises()
    // שליפת systemId מהכתובת
    const { systemId } = useParams<{ systemId: string }>()

    // חיפוש התרגיל הרלוונטי
    const exercise = exercises.find((ex) => ex.systemId === systemId)

    if (!exercise) {
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    const { baseDetails } = exercise
    const { instructions = [] } = baseDetails

    // רנדר של פסקאות/הוראות (CraftElement)
    const Instructions = instructions.map((instruction, index) => {
        if (!instruction || instruction.type !== 'paragraph') {
            return null // Skip null or non-paragraph instructions
        }
        const { id, content } = instruction as {
            id: string
            type: 'paragraph'
            content: CraftTextSegment[]
        }
        return (
            <CraftParagraph
                key={index}
                paragraph={{ id, type: 'paragraph', content }}
            />
        )
    })

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '40px',
            }}
        >
            <ExerciseDetailCard title="הנחיות">
                <Stack>{Instructions}</Stack>
            </ExerciseDetailCard>
        </Stack>
    )
}
