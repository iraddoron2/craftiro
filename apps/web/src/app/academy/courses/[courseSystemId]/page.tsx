'use client'

import { FullWidthCard, SystemHomePageHeroSection } from '@/components'
import { PagesNavbar } from '@/components/shared'
import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { useUserStore } from '@/store/userStore'
import { CraftiroCourse, CraftiroCourseLevel } from '@/types/craftiroCourses'
import { isAdmin } from '@/utils'
import { Button, Text } from '@craftiro/ui'
import { BaseCard, BaseCardText } from '@craftiro/ui-composites'
import Stack from '@mui/material/Stack/Stack'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { CourseSubNavbar } from '../_components'

type CourseLevelCardProps = {
    level: CraftiroCourseLevel
    levelNumber: number
    courseSystemId: string
}

const CourseLevelCard = ({
    level,
    levelNumber,
    courseSystemId,
}: CourseLevelCardProps) => {
    const router = useRouter()
    const { levelShortDescription, levelTitle, levelSystemId } = level

    const handleEnterLevel = () => {
        router.push(
            `/academy/courses/${courseSystemId}/levels/${levelSystemId}`
        )
    }

    return (
        <BaseCard
            title={`שלב ${levelNumber}: ${levelTitle || 'אין שם לשלב הזה'}`}
            style={{
                width: '100%',
                minHeight: '120px',
                fontSize: '24px',
                marginBottom: '12px',
            }}
        >
            <Text
                style={{
                    margin: 0,
                    lineHeight: 1.5,
                    textAlign: 'right',
                }}
            >
                {levelShortDescription || 'אין תיאור לשלב הזה.'}
            </Text>
            <Button
                onClick={handleEnterLevel}
                style={{ marginTop: '12px' }}
                label="כניסה לשלב"
            />
        </BaseCard>
    )
}

export default function CoursePage() {
    const { courseSystemId } = useParams<{ courseSystemId: string }>()
    const user = useUserStore((state) => state.user)
    const isUserAdmin = isAdmin(user)
    // Select from Zustand store (separate selectors to avoid getSnapshot loop)
    const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)

    // Find course once inputs change
    const course: CraftiroCourse | null = useMemo(() => {
        if (!craftiroCourses?.length || !courseSystemId) return null
        return (
            craftiroCourses.find((c) => c.systemId === courseSystemId) ?? null
        )
    }, [craftiroCourses, courseSystemId])

    const { name, longDescription, mainSubjects, levels } = course || {
        name: 'קורס לא נמצא',
        longDescription: '',
        mainSubjects: [],
        levels: [],
    }

    return (
        <SystemHomePageHeroSection title={null} subtitle={null}>
            <PagesNavbar
                links={
                    isUserAdmin
                        ? [
                              { href: '/academy', label: 'עמוד בית' },
                              { href: '/academy/store', label: 'חנות' },
                              {
                                  href: '/academy/my-learning',
                                  label: 'הלמידה שלי',
                              },
                              { href: '/academy/courses', label: 'קורסים' },
                              { href: '/academy/exercises', label: 'תרגילים' },
                              { href: '/academy/essays', label: 'מאמרים' },
                              { href: '/academy/questions', label: 'שאלות' },
                              { href: '/academy/lessons', label: 'שיעורים' },
                              { href: '/academy/books', label: 'ספרים' },
                              {
                                  href: '/academy/infographics',
                                  label: 'אינפוגרפיקות',
                              },
                              { href: '/academy/feed', label: 'פיד' },
                              { href: '/academy/songs', label: 'שירים' },
                              { href: '/academy/pieces', label: 'יצירות' },

                              { href: '/academy/games', label: 'משחקים' },
                              { href: '/academy/score', label: 'נקודות' },
                              {
                                  href: '/academy/achievements',
                                  label: 'הישגים',
                              },
                              { href: '/academy/skills', label: 'כישורים' },
                              {
                                  href: '/academy/certificates',
                                  label: 'תעודות',
                              },
                              {
                                  href: '/academy/stats',
                                  label: 'סטטיסטיקות',
                              },
                          ]
                        : [
                              { href: '/academy', label: 'עמוד בית' },
                              { href: '/academy/exercises', label: 'תרגילים' },
                          ]
                }
            />
            <FullWidthCard
                title={name}
                color="blue"
                style={{
                    margin: '24px',
                    width: 'calc(100% - 48px)',
                }}
            />
            <CourseSubNavbar />
            <Stack
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
                    justifyContent: 'center',
                    gap: '24px',
                }}
            >
                <BaseCard
                    title="מה נלמד בקורס הזה?"
                    style={{
                        width: 'fit-content',
                        maxWidth: '100%',
                        fontSize: '28px',
                        minHeight: '220px',
                    }}
                >
                    <BaseCardText
                        style={{
                            margin: 0,
                            lineHeight: 1.5,
                            textAlign: 'right',
                        }}
                        text={longDescription || 'אין תיאור לקורס הזה.'}
                    />
                </BaseCard>
                <BaseCard
                    title="נושאים עיקריים בקורס"
                    style={{
                        width: 'fit-content',
                        maxWidth: '100%',
                        fontSize: '28px',
                        minHeight: '220px',
                    }}
                >
                    {mainSubjects && mainSubjects.length > 0 ? (
                        <ul
                            style={{
                                margin: 0,
                                paddingLeft: '20px',
                                textAlign: 'right',
                            }}
                        >
                            {mainSubjects.map((subject, index) => (
                                <li
                                    key={index}
                                    style={{
                                        fontSize: '20px',
                                        lineHeight: 1.5,
                                        marginBottom: '8px',
                                    }}
                                >
                                    <Stack
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            gap: '8px',
                                        }}
                                    >
                                        <Stack
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    'var(--color-intent-primary-main)',
                                            }}
                                        ></Stack>
                                        <BaseCardText
                                            text={subject}
                                            style={{
                                                margin: 0,
                                                lineHeight: 1.5,
                                                textAlign: 'right',
                                            }}
                                        />
                                    </Stack>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <BaseCardText
                            style={{
                                margin: 0,
                                lineHeight: 1.5,
                                textAlign: 'right',
                            }}
                            text="אין נושאים לקורס הזה."
                        />
                    )}
                </BaseCard>
            </Stack>
            <BaseCard
                title="שלבים"
                style={{
                    margin: '24px',
                    width: '100%',
                    minHeight: '220px',
                    fontSize: '28px',
                }}
            >
                {levels && levels.length > 0 ? (
                    levels.map((level, index) => (
                        <CourseLevelCard
                            key={index}
                            level={level}
                            levelNumber={index + 1}
                            courseSystemId={courseSystemId}
                        />
                    ))
                ) : (
                    <BaseCardText
                        style={{
                            margin: 0,
                            lineHeight: 1.5,
                            textAlign: 'right',
                        }}
                        text="אין שלבים לקורס הזה."
                    />
                )}
            </BaseCard>
        </SystemHomePageHeroSection>
    )
}
