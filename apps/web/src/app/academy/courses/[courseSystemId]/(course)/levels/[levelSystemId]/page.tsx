'use client'

import { FullWidthCard, SystemHomePageHeroSection } from '@/components'
import { PagesNavbar } from '@/components/shared'
import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { useUserStore } from '@/store/userStore'
import {
    CraftiroCourse,
    CraftiroCourseLevel,
    CraftiroCourseStep,
} from '@/types/craftiroCourses'
import { isAdmin } from '@/utils'
import { Button } from '@craftiro/ui'
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
}

const LevelStepCard = ({
    step,
    stepNumber,
    courseSystemId,
    levelSystemId,
}: LevelStepCardProps) => {
    const router = useRouter()
    const { stepTitle, stepSystemId } = step

    const handleEnterStep = () => {
        router.push(
            `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/screens/1`
        )
    }

    return (
        <BaseCard
            title={`${stepNumber}. ${stepTitle || 'אין שם לצעד הזה'}`}
            style={{
                width: '100%',
                minHeight: '120px',
                fontSize: '24px',
                marginBottom: '12px',
            }}
        >
            <Button
                onClick={handleEnterStep}
                style={{ marginTop: '12px' }}
                label="כניסה לצעד"
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
                    }}
                >
                    <BaseCardText
                        style={{
                            margin: 0,
                            lineHeight: 1.5,
                            textAlign: 'right',
                        }}
                        text={levelLongDescription || 'אין תיאור לקורס הזה.'}
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
            </BaseCard>
        </SystemHomePageHeroSection>
    )
}
