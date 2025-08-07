'use client'

import { useCraftiroExercises } from '@/context/craftiroExercisesContext'
import { ExerciseVersion } from '@/types/craftiroExercises'
import { Button, Stack, Text } from '@core'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ExerciseDetailCard } from '../../_components'

export default function Page() {
    // שליפת כל התרגילים מהקונטקסט
    const { exercises } = useCraftiroExercises()
    // קבלת systemId מה־URL
    const { systemId } = useParams<{ systemId: string }>()

    // חיפוש התרגיל הרלוונטי
    const exercise = exercises.find((ex) => ex.systemId === systemId)

    if (!exercise) {
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    // שליפת הגרסה הראשית (mainVersion)
    const { mainVersion = {} as ExerciseVersion } = exercise

    const { assets = { driveChartsLinks: [] } } = mainVersion

    const {
        driveChartsLinks,
        // אפשר להוסיף שדות נוספים כאן במידת הצורך
    } = assets

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '40px',
            }}
        >
            <ExerciseDetailCard title="תווים">
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    {(driveChartsLinks?.length ?? 0) === 0 && (
                        <Text text="לא נמצאו קישורים לתווים" />
                    )}
                    {(driveChartsLinks ?? []).map((link) => {
                        const { labels = [], url = '' } = link
                        const getFormattedLabels = (labels: string[]) => {
                            const seperator = ' | '
                            const fullString = labels.join(seperator)
                            return fullString || 'ללא תוויות'
                        }

                        const driveLinkLabelTranslator = (label: string) => {
                            const dictionary: Record<string, string> = {
                                'Lead Sheet': 'Lead Sheet',
                                'Chord Chart': 'טבלת אקורדים',
                                'Full Score': 'תווים מלאים',
                                Scale: 'תווים גדולים',
                                Tablature: 'טבלטורה',
                            }
                            return dictionary[label] || label
                        }

                        const convertLabelsToTranslatedLabels = (
                            labels: string[]
                        ) => labels.map(driveLinkLabelTranslator)

                        const translatedLabels =
                            convertLabelsToTranslatedLabels(labels)
                        const formattedLabels =
                            getFormattedLabels(translatedLabels)

                        return (
                            <Stack
                                key={url}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    variant="h2"
                                    text={formattedLabels}
                                    sx={{
                                        fontSize: '24px',
                                        marginBottom: '8px',
                                    }}
                                />
                                <Link href={url} target="_blank">
                                    <Button
                                        label="כניסה לתווים"
                                        color="primary"
                                    />
                                </Link>
                            </Stack>
                        )
                    })}
                </Stack>
            </ExerciseDetailCard>
        </Stack>
    )
}
