'use client'

import { CraftiroExercise } from '@/types/craftiroExercises'
import { Button, Stack, Text } from '@craftiro/ui'
import { useRouter } from 'next/navigation'
import { getTermsTranslate } from '../../utils'

type Props = {
    craftiroExercise: CraftiroExercise
}

export const CraftiroExerciseCard = ({ craftiroExercise }: Props) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/academy/exercises/${craftiroExercise.systemId}/info`)
    }

    const { systemId, baseDetails } = craftiroExercise
    const { name, description, exerciseType = 'Unknown' } = baseDetails

    return (
        <Stack
            style={{
                borderWidth: '2px',
                borderColor: 'var(--color-border-main)',
                borderStyle: 'solid',
                backgroundColor: 'var(--color-background-main)',
                borderRadius: '12px',
                padding: '32px',
                width: '460px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}
        >
            <Stack
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                <Text
                    variant="h4"
                    style={{
                        fontSize: '24px',
                    }}
                >
                    {name}
                </Text>
                <Text
                    variant="h5"
                    style={{
                        fontSize: '24px',
                    }}
                >
                    {systemId}
                </Text>
            </Stack>
            <Stack>
                <Text variant="body">{description}</Text>
            </Stack>
            <Stack
                style={{
                    margin: '8px',
                    display: 'flex',
                    flexDirection: 'row',

                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <Text
                    variant="body"
                    style={{
                        fontSize: '20px',
                    }}
                >
                    סוג תרגיל:{' '}
                    {getTermsTranslate(exerciseType ?? 'Unknown') || ''}
                </Text>
            </Stack>

            <Button
                label="כניסה לתרגיל"
                color="primary"
                onClick={handleClick}
            />
        </Stack>
    )
}
