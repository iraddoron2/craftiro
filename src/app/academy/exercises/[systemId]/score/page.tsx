'use client'

import { exercises } from '@/data/demoData/exercises'
import { Stack, Text } from '@core'
import { useTheme } from '@hooks'
import { useParams } from 'next/navigation'
import { getExerciseBySystemId } from '../../utils'

export default function Page() {
    const { systemId } = useParams<{ systemId: string }>()
    const theme = useTheme()

    const exercise = getExerciseBySystemId(exercises, systemId)

    if (!exercise) {
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    const { baseEvaluation } = exercise

    const { xpScore, skillsScore } = baseEvaluation

    // const { feedback, scoreCheckType, xpScore, skillsScore } = baseEvaluation

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '40px',
            }}
        >
            <Stack
                sx={{
                    gap: '40px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    flexWrap: 'wrap',
                }}
            >
                <Stack
                    sx={{
                        width: '300px',
                        height: '180px',
                        backgroundColor: theme.background.miroColors[1],
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <Stack>
                        <Text
                            variant="h3"
                            text="ניקוד XP"
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontSize: '24px',
                                fontWeight: 600,
                            }}
                        />
                    </Stack>
                    <Stack
                        sx={{
                            height: 'fit-content',
                        }}
                    >
                        <Text
                            variant="h3"
                            text={(xpScore ?? 0).toString()}
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontFamily: 'Assistant',
                                fontSize: '52px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                            }}
                        />
                        <Text
                            variant="body1"
                            text="נקודות ניסיון כלליות"
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontFamily: 'Assistant',
                                fontSize: '16px',
                                fontWeight: 400,
                            }}
                        />
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        width: '300px',
                        height: '180px',
                        backgroundColor: theme.background.miroColors[5],
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <Stack>
                        <Text
                            variant="h3"
                            text="ניקוד Skills"
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontSize: '24px',
                                fontWeight: 600,
                            }}
                        />
                    </Stack>
                    <Stack
                        sx={{
                            height: 'fit-content',
                        }}
                    >
                        <Text
                            variant="h3"
                            text={(skillsScore ?? 0).toString()}
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontFamily: 'Assistant',
                                fontSize: '52px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                            }}
                        />
                        <Text
                            variant="body1"
                            text="נקודות ניסיון כלליות"
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontFamily: 'Assistant',
                                fontSize: '16px',
                                fontWeight: 400,
                            }}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
