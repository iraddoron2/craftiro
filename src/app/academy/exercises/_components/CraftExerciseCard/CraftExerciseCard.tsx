'use client'

import { CraftExercise } from '@/types/craftiroExercises'
import { Button, Stack, Text } from '@core'
import { useTheme } from '@hooks'
import { colors } from '@styles'
import { useRouter } from 'next/navigation'
import { getTermsTranslate } from '../../utils'

type Props = {
    craftExercise: CraftExercise
}

export const CraftExerciseCard = ({ craftExercise }: Props) => {
    const router = useRouter()
    const theme = useTheme()

    const handleClick = () => {
        router.push(`/academy/exercises/${craftExercise.systemId}/info`)
    }

    const { systemId, baseDetails } = craftExercise
    const { name, description, exerciseType = 'Unknown' } = baseDetails

    return (
        <Stack
            sx={{
                borderWidth: '2px',
                borderColor: colors.gray[160],
                borderStyle: 'solid',
                backgroundColor: theme.background.card,
                borderRadius: '12px',
                padding: '32px',
                width: '460px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}
        >
            <Stack
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                <Text
                    text={name || ''}
                    variant="h4"
                    sx={{
                        fontSize: '24px',
                    }}
                />
                <Text
                    text={systemId || ''}
                    variant="h5"
                    sx={{
                        fontSize: '24px',
                    }}
                />
            </Stack>
            <Stack>
                <Text text={description || ''} variant="body1" />
            </Stack>
            <Stack
                sx={{
                    margin: '8px',
                    display: 'flex',
                    flexDirection: 'row',

                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <Text
                    text={`סוג תרגיל: ${
                        getTermsTranslate(exerciseType || 'Unknown') || ''
                    }`}
                    variant="body1"
                    sx={{
                        fontSize: '20px',
                    }}
                />
            </Stack>

            <Button
                label="כניסה לתרגיל"
                color="primary"
                onClick={handleClick}
            />
        </Stack>
    )
}
