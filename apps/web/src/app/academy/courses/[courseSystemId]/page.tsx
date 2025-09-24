'use client'

import {
    FullWidthCard,
    MainButton,
    SystemHomePageFrame,
    SystemHomePageHeroSection,
} from '@/components'
import { PagesNavbar } from '@/components/shared'
import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { useUserStore } from '@/store/userStore'
import { CraftiroCourse, CraftiroCourseLevel } from '@/types/craftiroCourses'
import { isAdmin } from '@/utils'
import { Text } from '@craftiro/ui'
import { BaseCard, BaseCardText } from '@craftiro/ui-composites'
import Stack from '@mui/material/Stack/Stack'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { CourseSubNavbar } from '../_components'

type CourseLevelCardProps = {
    level: CraftiroCourseLevel
    levelNumber: number
    courseSystemId: string
    state: 'not-started' | 'in-progress' | 'completed'
}

const CourseLevelCard = ({
    level,
    levelNumber,
    courseSystemId,
    state,
}: CourseLevelCardProps) => {
    const router = useRouter()
    const { levelShortDescription, levelTitle, levelSystemId } = level

    const handleEnterLevel = () => {
        router.push(
            `/academy/courses/${courseSystemId}/levels/${levelSystemId}`
        )
    }

    const getBackgroundColor = (
        state: 'not-started' | 'in-progress' | 'completed'
    ) => {
        switch (state) {
            case 'not-started':
                return 'var(--color-gray-190)'
            case 'in-progress':
                return 'var(--color-brand-blue-170)'
            case 'completed':
                return 'var(--color-green-170)'
            default:
                return 'var(--color-gray-190)'
        }
    }

    const getButtonColor = (
        state: 'not-started' | 'in-progress' | 'completed'
    ) => {
        switch (state) {
            case 'not-started':
                return 'gray'
            case 'in-progress':
                return 'brand-blue'
            case 'completed':
                return 'green'
            default:
                return 'gray'
        }
    }

    const getChipColor = (
        state: 'not-started' | 'in-progress' | 'completed'
    ) => {
        switch (state) {
            case 'not-started':
                return 'var(--color-gray-160)'
            case 'in-progress':
                return 'var(--color-brand-blue-150)'
            case 'completed':
                return 'var(--color-green-150)'
            default:
                return 'var(--color-gray-160)'
        }
    }

    return (
        <BaseCard
            style={{
                width: '360px',
                minHeight: '160px',
                fontSize: '24px',
                marginBottom: '12px',
                backgroundColor: getBackgroundColor(state),
                gap: '12px',
            }}
        >
            <Stack
                style={{
                    backgroundColor: getChipColor(state),
                    padding: '4px 12px',
                    borderRadius: '8px',
                    width: 'fit-content',
                    marginBottom: '12px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                }}
            >
                <Text
                    style={{
                        margin: 0,
                        lineHeight: 1.5,
                        fontSize: '20px',
                        fontWeight: 700,
                    }}
                >
                    {`שלב ${levelNumber}: `}
                </Text>
                <Text
                    style={{
                        margin: 0,
                        lineHeight: 1.5,
                        fontSize: '20px',
                    }}
                >
                    {`${levelTitle || 'אין שם לשלב הזה'}`}
                </Text>
            </Stack>
            <Text
                style={{
                    margin: 0,
                    lineHeight: 1.5,
                    textAlign: 'right',
                    fontSize: '18px',
                }}
            >
                {levelShortDescription || 'אין תיאור לשלב הזה.'}
            </Text>
            <MainButton
                onClick={handleEnterLevel}
                label="כניסה לשלב"
                color={getButtonColor(state)}
                variant="contained"
                style={{
                    width: '100%',
                    marginTop: '12px',
                }}
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
        <SystemHomePageFrame>
            <SystemHomePageHeroSection
                title={null}
                subtitle={null}
                style={{
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '100%',
                    height: 'calc(100vh - 60px)',
                }}
                contentPosition="top"
            >
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
                                  {
                                      href: '/academy/exercises',
                                      label: 'תרגילים',
                                  },
                                  { href: '/academy/essays', label: 'מאמרים' },
                                  {
                                      href: '/academy/questions',
                                      label: 'שאלות',
                                  },
                                  {
                                      href: '/academy/lessons',
                                      label: 'שיעורים',
                                  },
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
                                  {
                                      href: '/academy/exercises',
                                      label: 'תרגילים',
                                  },
                              ]
                    }
                />
                <FullWidthCard
                    title={name}
                    color="blue"
                    style={{ margin: '24px', width: 'calc(100% - 48px)' }}
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
                            color: 'var(--color-gray-80)',
                        }}
                    >
                        <BaseCardText
                            style={{
                                margin: 0,
                                lineHeight: 1.5,
                                textAlign: 'right',
                                fontSize: '20px',
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
                            color: 'var(--color-gray-80)',
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
                                                    width: '12px',
                                                    height: '12px',
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
                                                    fontSize: '20px',
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
                        color: 'var(--color-gray-80)',
                    }}
                >
                    <Stack
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '24px',
                            flexWrap: 'wrap',
                            width: '100%',
                        }}
                    >
                        {levels && levels.length > 0 ? (
                            levels.map((level, index) => (
                                <CourseLevelCard
                                    key={index}
                                    level={level}
                                    levelNumber={index + 1}
                                    courseSystemId={courseSystemId}
                                    state="in-progress"
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
                    </Stack>
                </BaseCard>
            </SystemHomePageHeroSection>
        </SystemHomePageFrame>
    )
}
