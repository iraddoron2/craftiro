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
import {
    CraftiroCourse,
    CraftiroCourseLevel,
    CraftiroCourseStep,
} from '@/types/craftiroCourses'
import { isAdmin } from '@/utils'
import { Text } from '@craftiro/ui'
import { BaseCard, BaseCardText } from '@craftiro/ui-composites'
import Stack from '@mui/material/Stack/Stack'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { CourseSubNavbar } from '../../../../_components'

export type LevelStepCardProps = {
    step: CraftiroCourseStep
    stepNumber: number
    levelSystemId: string
    stepSystemId: string
    courseSystemId: string
    state: 'not-started' | 'in-progress' | 'completed'
}

const LevelStepCard = ({
    step,
    stepNumber,
    courseSystemId,
    levelSystemId,
    state,
}: LevelStepCardProps) => {
    const router = useRouter()
    const { stepTitle, stepSystemId } = step

    const handleEnterStep = () => {
        router.push(
            `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/screens/1`
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
                    {`צעד ${stepNumber}: `}
                </Text>
                <Text
                    style={{
                        margin: 0,
                        lineHeight: 1.5,
                        fontSize: '20px',
                    }}
                >
                    {`${stepTitle || 'אין שם לשלב הזה'}`}
                </Text>
            </Stack>

            <MainButton
                onClick={handleEnterStep}
                label="כניסה לצעד"
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

export default function LevelPage() {
    const { courseSystemId } = useParams<{
        courseSystemId: string
    }>()

    const { levelSystemId } = useParams<{
        levelSystemId: string
    }>()

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

    const { levels } = course || {
        levels: [],
    }

    // Find level once inputs change
    const level: CraftiroCourseLevel | null = useMemo(() => {
        if (!levels?.length || !levelSystemId) return null
        return levels.find((l) => l.levelSystemId === levelSystemId) ?? null
    }, [levels, levelSystemId])

    if (!course || !level) {
        return (
            <SystemHomePageHeroSection title={null} subtitle={null}>
                <FullWidthCard
                    title="הקורס או השלב לא נמצאו"
                    color="red"
                    style={{ margin: '24px', width: 'calc(100% - 48px)' }}
                />

                <p>
                    {`courseSystemId: ${courseSystemId}, levelSystemId: ${levelSystemId}`}
                </p>
                <p>{`levelSystemId from level: ${levelSystemId} `}</p>
                <pre>{JSON.stringify(course?.levels, null, 2)}</pre>
            </SystemHomePageHeroSection>
        )
    }

    const { levelTitle, levelLongDescription, steps } = level

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
                    title={levelTitle || 'אין שם לשלב הזה'}
                    color="blue"
                    style={{ margin: '24px', width: 'calc(100% - 48px)' }}
                />
                <CourseSubNavbar
                    isBackButton={true}
                    backLabel="חזרה לדף הקורס"
                    backUrl={`/academy/courses/${courseSystemId}`}
                />
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
                        title="מה נלמד בשלב הזה?"
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
                            text={
                                levelLongDescription || 'אין תיאור לקורס הזה.'
                            }
                        />
                    </BaseCard>
                </Stack>
                <BaseCard
                    title="צעדים"
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
                            alignItems: 'start',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: '24px',
                            marginTop: '12px',
                            width: '100%',
                        }}
                    >
                        {steps && steps.length > 0 ? (
                            steps.map((step, index) => (
                                <LevelStepCard
                                    key={index}
                                    step={step}
                                    stepNumber={index + 1}
                                    courseSystemId={courseSystemId}
                                    levelSystemId={levelSystemId}
                                    stepSystemId={step.stepSystemId}
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
                                text="אין צעדים לקורס הזה."
                            />
                        )}
                    </Stack>
                </BaseCard>
            </SystemHomePageHeroSection>
        </SystemHomePageFrame>
    )
}
