'use client'

import { exercises } from '@/data/demoData/exercises'
import { CraftElement, CraftTextSegment } from '@/types'
import { Stack, Text } from '@core'
import { Paragraph as CraftParagraph } from '@craftElements/base/Paragraph'
import { useParams } from 'next/navigation'
import { ExerciseDetailCard } from '../../_components'
import { getExerciseBySystemId } from '../../utils'

export default function Page() {
    const { systemId } = useParams<{ systemId: string }>()

    const exercise = getExerciseBySystemId(exercises, systemId)

    if (!exercise) {
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    const { baseDetails } = exercise
    // const { meta, baseDetails, style, diagramStyle } = exercise

    // const { authorsIds, createdAt, updatedAt } = meta

    const {
        // exerciseType = 'תרגיל לא מזוהה',
        // difficulty = 1,
        // category = '',
        // tags = [],
        // targetAudience = [],
        // expectedDuration,
        // relatedSkills = [],
        instructions = [] as CraftElement[],
    } = baseDetails

    const Instructions = instructions.map((instruction) => {
        if (!instruction || instruction.type !== 'paragraph') {
            return null // Skip null or non-paragraph instructions
        }

        // Explicitly type instruction as a paragraph
        const { id, content } = instruction as {
            id: string
            type: 'paragraph'
            content: CraftTextSegment[]
        }

        return (
            <CraftParagraph
                key={id}
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
            {/* 
            <Stack>
                <h1>relatedSkills</h1>
                <pre>{JSON.stringify(relatedSkills, null, 2)}</pre>
            </Stack>

            <Stack>
                <h1>diagramStyle</h1>
                <pre>{JSON.stringify(diagramStyle, null, 2)}</pre>
            </Stack>
            <Stack>
                <h1>style</h1>
                <pre>{JSON.stringify(style, null, 2)}</pre>
            </Stack>

            <Stack>
                <h1>authorsIds</h1>
                <pre>{JSON.stringify(authorsIds, null, 2)}</pre>
            </Stack>
            <Stack>
                <h1>createdAt</h1>
                <pre>{JSON.stringify(createdAt, null, 2)}</pre>
            </Stack>
            <Stack>
                <h1>updatedAt</h1>
                <pre>{JSON.stringify(updatedAt, null, 2)}</pre>
            </Stack>
            <Stack>
                <h1>exerciseType</h1>
                <pre>{JSON.stringify(exerciseType, null, 2)}</pre>
            </Stack>
            <Stack>
                <h1>difficulty</h1>
                <pre>{JSON.stringify(difficulty, null, 2)}</pre>
            </Stack>
            <Stack>
                <h1>category</h1>
                <pre>{JSON.stringify(category, null, 2)}</pre>
            </Stack>
            <Stack>
                <h1>tags</h1>
                <pre>{JSON.stringify(tags, null, 2)}</pre>
            </Stack>
            <Stack>
                <h1>targetAudience</h1>
                <pre>{JSON.stringify(targetAudience, null, 2)}</pre>
            </Stack>
            <Stack>
                <h1>expectedDuration</h1>
                <pre>{JSON.stringify(expectedDuration, null, 2)}</pre>
            </Stack> */}
        </Stack>
    )
}
