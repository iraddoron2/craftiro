'use client'

import { SystemHomePageFrame, SystemHomePageHeroSection } from '@/components'
import { useCraftiroCoursesStore } from '@/store'
import { Button, Stack, Text } from '@craftiro/ui'
import { useParams, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import { ScreenToolsBar } from './_components'
import { ScreenNavigationControls } from './_components/ScreenNavigationControls'

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
    const { courseSystemId, levelSystemId, stepSystemId, screenSystemId } =
        useParams() as {
            courseSystemId: string
            levelSystemId: string
            stepSystemId: string
            screenSystemId: string
        }

    const router = useRouter()
    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)

    const currentCourse = courses.find((c) => c.systemId === courseSystemId)
    const currentLevel = currentCourse?.levels?.find(
        (l) => l.levelSystemId === levelSystemId
    )
    const currentStep = currentLevel?.steps?.find(
        (s) => s.stepSystemId === stepSystemId
    )

    // המסך הנוכחי
    const currentScreen = useMemo(
        () =>
            currentStep?.screens?.find(
                (sc) => sc.screenSystemId === screenSystemId
            ),
        [currentStep, screenSystemId]
    )

    // חישוב אינדקס ומספר / סה״כ (לתצוגה ב־ScreenToolsBar)
    const currentScreenIndex = useMemo(() => {
        if (!currentStep) return -1
        return (
            currentStep.screens?.findIndex(
                (sc) => sc.screenSystemId === screenSystemId
            ) ?? -1
        )
    }, [currentStep, screenSystemId])

    const totalScreens = currentStep?.screens?.length ?? 0
    const currentScreenNumber = useMemo(
        () => (currentScreenIndex >= 0 ? currentScreenIndex + 1 : null),
        [currentScreenIndex]
    )

    const handleNavigateToLevel = () => {
        router.push(
            `/academy/courses/${courseSystemId}/levels/${levelSystemId}`
        )
    }

    const isMissing =
        !currentCourse || !currentLevel || !currentStep || !currentScreen

    if (isMissing) {
        return (
            <Stack
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text variant="h2" style={{ marginBottom: '16px' }}>
                    {!currentStep
                        ? 'הצעד לא נמצא'
                        : 'המסך לא נמצא או שגיאה בטעינתו'}
                </Text>
                <Button
                    onClick={handleNavigateToLevel}
                    label={!currentStep ? 'חזרה לרמה' : 'חזרה לשלב'}
                />
            </Stack>
        )
    }

    return (
        <SystemHomePageFrame
            // className="file:academy-course-step-layout-container"
            style={{
                padding: '0px',
            }}
        >
            <SystemHomePageHeroSection
                title={null}
                subtitle={null}
                style={{
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '100%',
                    height: '100%',
                    marginRight: '-256px',
                }}
            >
                <Stack
                    className="file:academy-course-step-layout-header"
                    style={{
                        width: '100%',
                        maxWidth: '1200px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Stack
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '16px',
                        }}
                    >
                        <Stack
                            style={{
                                backgroundColor: 'var(--color-purple-190)',
                                minWidth: '320px',
                                border: 'solid 2px var(--color-purple-100)',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '8px 16px',
                                borderRadius: '12px',
                            }}
                        >
                            <Text
                                variant="h3"
                                style={{
                                    padding: '4px 8px',
                                    color: 'var(--color-purple-100)',
                                    textAlign: 'right',
                                    fontWeight: 'bold',
                                    fontSize: '32px',
                                }}
                            >
                                שלב {levelSystemId}
                            </Text>
                            <Text
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: 'var(--color-purple-100)',
                                }}
                            >
                                {currentLevel.levelTitle || ''}
                            </Text>
                        </Stack>
                        <Stack
                            style={{
                                backgroundColor: 'var(--color-brand-blue-190)',
                                minWidth: '320px',
                                border: 'solid 2px var(--color-brand-blue-100)',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '8px 16px',
                                borderRadius: '12px',
                                height: '68px',
                            }}
                        >
                            <Text
                                variant="h3"
                                style={{
                                    padding: '4px 8px',
                                    color: 'var(--color-brand-blue-100)',
                                    textAlign: 'right',
                                    fontWeight: 'bold',
                                    fontSize: '32px',
                                }}
                            >
                                צעד {stepSystemId}
                            </Text>
                            <Text
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: 'var(--color-brand-blue-100)',
                                }}
                            >
                                {currentStep.stepTitle || ''}
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack
                        style={{
                            backgroundColor: 'var(--color-brand-blue-190)',
                            border: 'solid 2px var(--color-brand-blue-100)',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: '12px',
                            height: '68px',
                            width: '320px',
                            padding: '8px 12px',
                            boxSizing: 'border-box',
                        }}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={
                            totalScreens > 0 && currentScreenIndex >= 0
                                ? Math.max(
                                      0,
                                      Math.min(
                                          100,
                                          Math.round(
                                              ((currentScreenIndex + 1) /
                                                  totalScreens) *
                                                  100
                                          )
                                      )
                                  )
                                : 0
                        }
                        aria-label="התקדמות במסכי הצעד"
                    >
                        {/* מסגרת פנימית של הפרוגרס־בר */}
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '28px',
                                borderRadius: '10px',
                                backgroundColor: 'var(--color-brand-blue-160)',
                                overflow: 'hidden',
                            }}
                        >
                            {/* מילוי */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width:
                                        totalScreens > 0 &&
                                        currentScreenIndex >= 0
                                            ? `${Math.max(
                                                  0,
                                                  Math.min(
                                                      100,
                                                      Math.round(
                                                          ((currentScreenIndex +
                                                              1) /
                                                              totalScreens) *
                                                              100
                                                      )
                                                  )
                                              )}%`
                                            : '0%',
                                    backgroundColor:
                                        'var(--color-intent-primary-main)',
                                    transition: 'width 240ms ease-in-out',
                                }}
                            />

                            {/* טקסט אחוזים במרכז */}
                            <span
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    color: 'var(--color-base-white)',
                                    userSelect: 'none',
                                }}
                            >
                                {totalScreens > 0 && currentScreenIndex >= 0
                                    ? `${Math.max(
                                          0,
                                          Math.min(
                                              100,
                                              Math.round(
                                                  ((currentScreenIndex + 1) /
                                                      totalScreens) *
                                                      100
                                              )
                                          )
                                      )}%`
                                    : '0%'}
                            </span>
                        </div>
                    </Stack>
                </Stack>
                {/* אזור התוכן עם גובה קבוע וגלילה פנימית */}
                <Stack
                    className="file:academy-course-step-layout"
                    style={{
                        width: '100%',
                        maxWidth: '1200px',

                        // גובה קבוע + גלילה פנימית
                        height: 'calc(100vh - 300px)',
                        overflowY: 'auto',

                        // חוויית גלילה
                        WebkitOverflowScrolling: 'touch',
                        overscrollBehavior: 'contain',

                        // מסגרת/רקע לפי הסגנון שהיה לך קודם
                        flexShrink: 0,
                        position: 'relative',
                        borderRadius: '12px',
                        border: '2px solid var(--color-divider-main)',
                        backgroundColor:
                            'var(--color-text-on-contrast-background)',
                    }}
                >
                    {/* פס הכלים העליון של המסך (הקומפוננטה שכבר יש לך) */}
                    <ScreenToolsBar
                        onBack={handleNavigateToLevel}
                        screenTitle={currentScreen.screenTitle}
                        learningTimeSec={currentScreen.learningTimeInSeconds}
                        screenType={currentScreen.screenType}
                        currentIndex={currentScreenNumber ?? undefined}
                        totalScreens={totalScreens}
                    />

                    {/* תוכן המסך בפועל */}
                    <Stack style={{ padding: '12px 24px' }}>{children}</Stack>
                </Stack>

                {/* כפתורי הניווט התחתונים (קומפוננטה נפרדת שכבר יצרת) */}
                <ScreenNavigationControls
                    courseSystemId={courseSystemId}
                    levelSystemId={levelSystemId}
                    stepSystemId={stepSystemId}
                    screenSystemId={screenSystemId}
                    currentCourse={currentCourse}
                    currentLevel={currentLevel}
                    currentStep={currentStep}
                    router={router}
                    onMarkAsDone={() => {
                        console.log('mark as done', {
                            courseSystemId,
                            levelSystemId,
                            stepSystemId,
                            screenSystemId,
                        })
                    }}
                />
            </SystemHomePageHeroSection>
        </SystemHomePageFrame>
    )
}
