'use client'

import { exercises } from '@/data/demoData/exercises'
import { ExerciseVersion } from '@/types/craftExercises'
import { Button, Stack, Text } from '@core'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ExerciseDetailCard } from '../../_components'
import { getExerciseBySystemId } from '../../utils'

export default function Page() {
    const { systemId } = useParams<{ systemId: string }>()

    const exercise = getExerciseBySystemId(exercises, systemId)

    if (!exercise) {
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    const { mainVersion = {} as ExerciseVersion } = exercise // TODO: add "versions" when implemented

    const { assets } = mainVersion
    // const { meta, details, assets } = mainVersion

    // const { authorsIds, createdAt, updatedAt, version } = meta

    // const { name, description } = details

    const {
        driveChartsLinks = [],
        // resources = [],
        // solution = null,
        // explanationVideo = null,
        // abcNotation = '',
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
                    {driveChartsLinks.map((link) => {
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
                        ) => {
                            return labels.map(driveLinkLabelTranslator)
                        }
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

            {/* <Stack>
                <h1>versions</h1>
                <pre>{JSON.stringify(versions, null, 2)}</pre>
            </Stack> */}
        </Stack>
    )
}
