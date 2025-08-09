'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { CraftiroCourse } from '@/types/craftiroCourses'
import { Button, Stack, Text } from '@core'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function CoursePage() {
    const { courseSystemId } = useParams<{ courseSystemId: string }>()

    // Select from Zustand store (separate selectors to avoid getSnapshot loop)
    const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const craftiroCoursesLoading = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesLoading
    )
    const craftiroCoursesError = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesError
    )

    // Find course once inputs change
    const course: CraftiroCourse | null = useMemo(() => {
        if (!craftiroCourses?.length || !courseSystemId) return null
        return (
            craftiroCourses.find((c) => c.systemId === courseSystemId) ?? null
        )
    }, [craftiroCourses, courseSystemId])

    // Map numeric difficulty to label
    const getDifficultyLabel = (diff?: number) => {
        switch (diff) {
            case 1:
                return 'מתחילים'
            case 2:
                return 'קל'
            case 3:
                return 'בינוני'
            case 4:
                return 'מתקדם'
            case 5:
                return 'מאתגר'
            default:
                return 'לא ידוע'
        }
    }

    // Loading state
    if (craftiroCoursesLoading) {
        return (
            <Stack sx={{ padding: '40px', alignItems: 'center' }}>
                <Text variant="h2" text="טוען קורס..." />
            </Stack>
        )
    }

    // Error state
    if (craftiroCoursesError) {
        return (
            <Stack sx={{ padding: '40px', alignItems: 'center', gap: '16px' }}>
                <Text
                    variant="h2"
                    text="שגיאה בטעינת קורס"
                    sx={{ color: '#C72222' }}
                />
                <Text
                    variant="caption"
                    text={craftiroCoursesError}
                    sx={{ color: '#C72222' }}
                />
                <Link href="/academy/courses">
                    <Button label="חזרה לכל הקורסים" color="primary" />
                </Link>
            </Stack>
        )
    }

    // Not found state
    if (!course) {
        return (
            <Stack sx={{ padding: '40px', alignItems: 'center', gap: '16px' }}>
                <Text variant="h2" text="הקורס לא נמצא" />
                <Text
                    variant="caption"
                    text={`מזהה קורס: ${courseSystemId}`}
                    sx={{ color: '#777' }}
                />
                <Link href="/academy/courses">
                    <Button label="חזרה לכל הקורסים" color="primary" />
                </Link>
            </Stack>
        )
    }

    const {
        name,
        shortDescription,
        longDescription,
        mainSubjects,
        difficulty,
        tags,
        authorsIds,
        levels,
    } = course

    return (
        <Stack
            sx={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px 0 0 0',
                gap: '30px',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <Text
                variant="h2"
                text={name}
                sx={{ fontWeight: 700, fontSize: '2.2rem', color: '#2266C7' }}
            />
            {shortDescription && (
                <Text
                    variant="body1"
                    text={shortDescription}
                    sx={{ color: '#444', fontWeight: 600, fontSize: '1.15rem' }}
                />
            )}
            {longDescription && (
                <Text
                    variant="body2"
                    text={longDescription}
                    sx={{ color: '#222', fontSize: '1rem' }}
                />
            )}

            {/* Difficulty + Tags */}
            <Stack
                sx={{ flexDirection: 'row', gap: '20px', marginTop: '12px' }}
            >
                <Text
                    variant="caption"
                    text={`רמה: ${getDifficultyLabel(difficulty)}`}
                    sx={{ color: '#2266C7', fontWeight: 700 }}
                />
                {!!tags?.length && (
                    <Stack sx={{ flexDirection: 'row', gap: '9px' }}>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    background: '#F2F7FF',
                                    color: '#2266C7',
                                    borderRadius: '7px',
                                    padding: '2px 10px',
                                    fontSize: '0.93em',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </Stack>
                )}
            </Stack>

            {/* Main Subjects */}
            {!!mainSubjects?.length && (
                <Stack
                    sx={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginTop: '10px',
                    }}
                >
                    {mainSubjects.map((subject) => (
                        <span
                            key={subject}
                            style={{
                                background: '#E9ECF8',
                                color: '#3352c3',
                                borderRadius: '6px',
                                padding: '2px 8px',
                                fontSize: '0.91em',
                            }}
                        >
                            {subject}
                        </span>
                    ))}
                </Stack>
            )}

            {/* Authors */}
            {!!authorsIds?.length && (
                <Text
                    variant="caption"
                    text={`מורים/מחברים: ${authorsIds.join(', ')}`}
                    sx={{ color: '#777', fontWeight: 500, marginTop: '8px' }}
                />
            )}

            {/* Levels */}
            {!!levels?.length && (
                <Stack sx={{ width: '100%', marginTop: '32px', gap: '24px' }}>
                    <Text
                        variant="h3"
                        text="רמות הקורס"
                        sx={{ color: '#2266C7', fontWeight: 600 }}
                    />
                    {levels.map((level, idx) => (
                        <Stack
                            key={level.levelSystemId || idx}
                            sx={{
                                background: '#F7F8FA',
                                borderRadius: '14px',
                                padding: '16px',
                                marginBottom: '14px',
                                boxShadow: '0 2px 10px 0 rgba(33,102,199,0.07)',
                            }}
                        >
                            <Text
                                variant="h4"
                                text={level.levelTitle}
                                sx={{ color: '#2266C7', fontWeight: 700 }}
                            />
                            {!!level.levelShortDescription && (
                                <Text
                                    variant="body2"
                                    text={level.levelShortDescription}
                                    sx={{ mb: '4px', color: '#444' }}
                                />
                            )}
                            {!!level.levelLongDescription && (
                                <Text
                                    variant="caption"
                                    text={level.levelLongDescription}
                                    sx={{ color: '#777' }}
                                />
                            )}
                        </Stack>
                    ))}
                </Stack>
            )}

            <Stack sx={{ marginTop: '40px' }}>
                <Link href="/academy/courses">
                    <Button label="חזרה לכל הקורסים" color="primary" />
                </Link>
            </Stack>
        </Stack>
    )
}
