'use client'

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useEffect, useMemo } from 'react'

type NavInfo = { href?: string; label: string; disabled: boolean }

type Level = {
    levelSystemId: string
    levelTitle: string
    steps?: Step[]
}

type Step = {
    stepSystemId: string
    stepTitle: string
    screens?: Screen[]
}

type Screen = {
    screenSystemId: string
    screenTitle: string
    learningTimeInSeconds: number
    screenType: unknown
    elements?: unknown[]
}

type Course = {
    systemId: string
    levels?: Level[]
}

export function useStepNav({
    courseSystemId,
    levelSystemId,
    stepSystemId,
    screenSystemId,
    currentCourse,
    currentLevel,
    currentStep,
    router,
}: {
    courseSystemId: string
    levelSystemId: string
    stepSystemId: string
    screenSystemId: string
    currentCourse?: Course
    currentLevel?: Level
    currentStep?: Step
    router: AppRouterInstance
}) {
    // const currentScreenIndex = useMemo(() => {
    //     if (!currentStep) return -1
    //     return (
    //         currentStep.screens?.findIndex(
    //             (sc) => sc.screenSystemId === screenSystemId
    //         ) ?? -1
    //     )
    // }, [currentStep, screenSystemId])

    const nextNav = useMemo<NavInfo>(() => {
        if (!currentCourse || !currentLevel || !currentStep) {
            return { label: 'אין מסך נוסף', disabled: true }
        }

        const screens = currentStep.screens ?? []
        const currentScreenNum = Number(screenSystemId)

        // 1) next screen
        if (
            screens.some(
                (s) => Number(s.screenSystemId) === currentScreenNum + 1
            )
        ) {
            return {
                href: `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/screens/${
                    currentScreenNum + 1
                }`,
                label: 'מסך הבא',
                disabled: false,
            }
        }

        // 2) first screen of next step
        const steps = currentLevel.steps ?? []
        const currentStepIndex = steps.findIndex(
            (s) => s.stepSystemId === stepSystemId
        )
        if (currentStepIndex >= 0 && currentStepIndex < steps.length - 1) {
            const nextStep = steps[currentStepIndex + 1]
            const firstScreen = nextStep?.screens?.[0]
            if (firstScreen) {
                return {
                    href: `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${nextStep.stepSystemId}/screens/${firstScreen.screenSystemId}`,
                    label: 'צעד הבא',
                    disabled: false,
                }
            }
        }

        // 3) first step's first screen of next level
        const levels = currentCourse.levels ?? []
        const currentLevelIndex = levels.findIndex(
            (l) => l.levelSystemId === levelSystemId
        )
        if (currentLevelIndex >= 0 && currentLevelIndex < levels.length - 1) {
            const nextLevel = levels[currentLevelIndex + 1]
            const firstStep = nextLevel?.steps?.[0]
            const firstScreen = firstStep?.screens?.[0]
            if (firstStep && firstScreen) {
                return {
                    href: `/academy/courses/${courseSystemId}/levels/${nextLevel.levelSystemId}/steps/${firstStep.stepSystemId}/screens/${firstScreen.screenSystemId}`,
                    label: 'שלב הבא',
                    disabled: false,
                }
            }
        }

        return { label: 'אין מסך נוסף', disabled: true }
    }, [
        courseSystemId,
        levelSystemId,
        stepSystemId,
        screenSystemId,
        currentCourse,
        currentLevel,
        currentStep,
    ])

    const prevNav = useMemo<NavInfo>(() => {
        if (!currentCourse || !currentLevel || !currentStep) {
            return { label: 'אין מסך קודם', disabled: true }
        }

        const screens = currentStep.screens ?? []
        const currentScreenNum = Number(screenSystemId)

        // 1) previous screen
        if (
            screens.some(
                (s) => Number(s.screenSystemId) === currentScreenNum - 1
            )
        ) {
            return {
                href: `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/screens/${
                    currentScreenNum - 1
                }`,
                label: 'מסך קודם',
                disabled: false,
            }
        }

        // 2) last screen of previous step
        const steps = currentLevel.steps ?? []
        const currentStepIndex = steps.findIndex(
            (s) => s.stepSystemId === stepSystemId
        )
        if (currentStepIndex > 0) {
            const prevStep = steps[currentStepIndex - 1]
            const prevScreens = prevStep?.screens ?? []
            const lastScreen = prevScreens[prevScreens.length - 1]
            if (lastScreen) {
                return {
                    href: `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${prevStep?.stepSystemId}/screens/${lastScreen.screenSystemId}`,
                    label: 'צעד קודם',
                    disabled: false,
                }
            }
        }

        // 3) last screen of last step of previous level
        const levels = currentCourse.levels ?? []
        const currentLevelIndex = levels.findIndex(
            (l) => l.levelSystemId === levelSystemId
        )
        if (currentLevelIndex > 0) {
            const prevLevel = levels[currentLevelIndex - 1]
            const prevSteps = prevLevel?.steps ?? []
            const lastStep = prevSteps[prevSteps.length - 1]
            const lastScreens = lastStep?.screens ?? []
            const lastScreen = lastScreens[lastScreens.length - 1]
            if (lastStep && lastScreen) {
                return {
                    href: `/academy/courses/${courseSystemId}/levels/${prevLevel?.levelSystemId}/steps/${lastStep.stepSystemId}/screens/${lastScreen.screenSystemId}`,
                    label: 'שלב קודם',
                    disabled: false,
                }
            }
        }

        return { label: 'אין מסך קודם', disabled: true }
    }, [
        courseSystemId,
        levelSystemId,
        stepSystemId,
        screenSystemId,
        currentCourse,
        currentLevel,
        currentStep,
    ])

    const handleGo = (nav: NavInfo) => {
        if (!nav.disabled && nav.href) router.push(nav.href)
    }

    // חיצי מקלדת = בדיוק כמו הכפתורים
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null
            const tag = target?.tagName?.toLowerCase()
            if (
                tag === 'input' ||
                tag === 'textarea' ||
                target?.isContentEditable
            )
                return

            if (e.key === 'ArrowLeft') {
                if (!nextNav.disabled && nextNav.href) {
                    e.preventDefault()
                    router.push(nextNav.href)
                }
            } else if (e.key === 'ArrowRight') {
                if (!prevNav.disabled && prevNav.href) {
                    e.preventDefault()
                    router.push(prevNav.href)
                }
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [nextNav, prevNav, router])

    return { nextNav, prevNav, handleGo }
}
