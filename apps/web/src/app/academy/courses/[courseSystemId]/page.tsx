'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { CraftiroCourse } from '@/types/craftiroCourses'
import { Button, Stack, Text } from '@craftiro/ui'
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
            <Stack style={{ padding: '40px', alignItems: 'center' }}>
                <Text variant="h2">טוען קורס...</Text>
            </Stack>
        )
    }

    // Error state
    if (craftiroCoursesError) {
        return (
            <Stack
                style={{ padding: '40px', alignItems: 'center', gap: '16px' }}
            >
                <Text variant="h2" style={{ color: '#C72222' }}>
                    שגיאה בטעינת קורס
                </Text>
                <Text variant="caption" style={{ color: '#C72222' }}>
                    {craftiroCoursesError}
                </Text>
                <Link href="/academy/courses">
                    <Button label="חזרה לכל הקורסים" color="primary" />
                </Link>
            </Stack>
        )
    }

    // Not found state
    if (!course) {
        return (
            <Stack
                style={{ padding: '40px', alignItems: 'center', gap: '16px' }}
            >
                <Text variant="h2">הקורס לא נמצא</Text>
                <Text variant="caption" style={{ color: '#777' }}>
                    מזהה קורס: {courseSystemId}
                </Text>
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
        authorIds,
        levels,
    } = course

    return (
        <Stack
            style={{
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
                style={{
                    fontWeight: 700,
                    fontSize: '2.2rem',
                    color: '#2266C7',
                }}
            >
                {name}
            </Text>
            {shortDescription && (
                <Text
                    variant="body"
                    style={{
                        color: '#444',
                        fontWeight: 600,
                        fontSize: '1.15rem',
                    }}
                >
                    {shortDescription}
                </Text>
            )}
            {longDescription && (
                <Text
                    variant="body"
                    style={{ color: '#222', fontSize: '1rem' }}
                >
                    {longDescription}
                </Text>
            )}

            {/* Difficulty + Tags */}
            <Stack
                style={{ flexDirection: 'row', gap: '20px', marginTop: '12px' }}
            >
                <Text
                    variant="caption"
                    style={{ color: '#2266C7', fontWeight: 700 }}
                >
                    רמה: {getDifficultyLabel(difficulty)}
                </Text>
                {!!tags?.length && (
                    <Stack style={{ flexDirection: 'row', gap: '9px' }}>
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
                    style={{
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
            {!!authorIds?.length && (
                <Text
                    variant="caption"
                    style={{ color: '#777', fontWeight: 500, marginTop: '8px' }}
                >
                    מורים/מחברים: {authorIds.join(', ')}
                </Text>
            )}

            {/* Levels */}
            {!!levels?.length && (
                <Stack
                    style={{ width: '100%', marginTop: '32px', gap: '24px' }}
                >
                    <Text
                        variant="h3"
                        style={{ color: '#2266C7', fontWeight: 600 }}
                    >
                        רמות הקורס
                    </Text>
                    {levels.map((level, idx) => (
                        <Stack
                            key={level.levelSystemId || idx}
                            style={{
                                background: '#F7F8FA',
                                borderRadius: '14px',
                                padding: '16px',
                                marginBottom: '14px',
                                boxShadow: '0 2px 10px 0 rgba(33,102,199,0.07)',
                            }}
                        >
                            <Text
                                variant="h4"
                                style={{ color: '#2266C7', fontWeight: 700 }}
                            >
                                {level.levelTitle}
                            </Text>
                            {!!level.levelShortDescription && (
                                <Text
                                    variant="body"
                                    style={{
                                        marginBottom: '4px',
                                        color: '#444',
                                    }}
                                >
                                    {level.levelShortDescription}
                                </Text>
                            )}
                            {!!level.levelLongDescription && (
                                <Text
                                    variant="caption"
                                    style={{ color: '#777' }}
                                >
                                    {level.levelLongDescription}
                                </Text>
                            )}
                        </Stack>
                    ))}
                </Stack>
            )}

            <Stack style={{ marginTop: '40px' }}>
                <Link href="/academy/courses">
                    <Button label="חזרה לכל הקורסים" color="primary" />
                </Link>
            </Stack>
        </Stack>
    )
}
