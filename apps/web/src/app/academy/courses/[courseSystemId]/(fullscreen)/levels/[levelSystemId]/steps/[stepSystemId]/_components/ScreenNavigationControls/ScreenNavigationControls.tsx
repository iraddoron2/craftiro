'use client'

import { MainButton } from '@/components'
import { Stack } from '@craftiro/ui'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React, { useCallback, useEffect, useMemo } from 'react'

type NavInfo = { href?: string; label: string; disabled: boolean }

type Screen = { screenSystemId: string }
type Step = { stepSystemId: string; screens?: Screen[] }
type Level = { levelSystemId: string; steps?: Step[] }
type Course = { systemId: string; levels?: Level[] }

type Props = {
    courseSystemId: string
    levelSystemId: string
    stepSystemId: string
    screenSystemId: string
    currentCourse?: Course
    currentLevel?: Level
    currentStep?: Step
    router: AppRouterInstance
    onMarkAsDone?: () => void
    enableKeyboardArrows?: boolean // שמאלה=הבא, ימינה=הקודם
}

export const ScreenNavigationControls: React.FC<Props> = ({
    courseSystemId,
    levelSystemId,
    stepSystemId,
    screenSystemId,
    currentCourse,
    currentLevel,
    currentStep,
    router,
    // onMarkAsDone,
    enableKeyboardArrows = true,
}) => {
    const nextNav = useMemo<NavInfo>(() => {
        if (!currentCourse || !currentLevel || !currentStep) {
            return { label: 'אין מסך נוסף', disabled: true }
        }

        const screens = currentStep.screens ?? []
        const curNum = Number(screenSystemId)

        // 1) next screen in current step
        if (screens.some((s) => Number(s.screenSystemId) === curNum + 1)) {
            return {
                href: `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/screens/${
                    curNum + 1
                }`,
                label: 'הבא',
                disabled: false,
            }
        }

        // 2) first screen of next step
        const steps = currentLevel.steps ?? []
        const stepIdx = steps.findIndex((s) => s.stepSystemId === stepSystemId)
        if (stepIdx >= 0 && stepIdx < steps.length - 1) {
            const nextStep = steps[stepIdx + 1]
            const firstScreen = nextStep?.screens?.[0]
            if (firstScreen) {
                return {
                    href: `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${nextStep.stepSystemId}/screens/${firstScreen.screenSystemId}`,
                    label: 'צעד הבא',
                    disabled: false,
                }
            }
        }

        // 3) first step + first screen of next level
        const levels = currentCourse.levels ?? []
        const levelIdx = levels.findIndex(
            (l) => l.levelSystemId === levelSystemId
        )
        if (levelIdx >= 0 && levelIdx < levels.length - 1) {
            const nextLevel = levels[levelIdx + 1]
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
        currentCourse,
        currentLevel,
        currentStep,
        courseSystemId,
        levelSystemId,
        stepSystemId,
        screenSystemId,
    ])

    const prevNav = useMemo<NavInfo>(() => {
        if (!currentCourse || !currentLevel || !currentStep) {
            return { label: 'אין מסך קודם', disabled: true }
        }

        const screens = currentStep.screens ?? []
        const curNum = Number(screenSystemId)

        // 1) prev screen in current step
        if (screens.some((s) => Number(s.screenSystemId) === curNum - 1)) {
            return {
                href: `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/screens/${
                    curNum - 1
                }`,
                label: 'הקודם',
                disabled: false,
            }
        }

        // 2) last screen of previous step
        const steps = currentLevel.steps ?? []
        const stepIdx = steps.findIndex((s) => s.stepSystemId === stepSystemId)
        if (stepIdx > 0) {
            const prevStep = steps[stepIdx - 1]
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
        const levelIdx = levels.findIndex(
            (l) => l.levelSystemId === levelSystemId
        )
        if (levelIdx > 0) {
            const prevLevel = levels[levelIdx - 1]
            const lastStep = prevLevel?.steps?.[prevLevel?.steps?.length - 1]
            const lastScreen =
                lastStep?.screens?.[lastStep?.screens?.length - 1]
            if (lastStep && lastScreen) {
                return {
                    href: `/academy/courses/${courseSystemId}/levels/${prevLevel.levelSystemId}/steps/${lastStep.stepSystemId}/screens/${lastScreen.screenSystemId}`,
                    label: 'שלב קודם',
                    disabled: false,
                }
            }
        }

        return { label: 'אין מסך קודם', disabled: true }
    }, [
        currentCourse,
        currentLevel,
        currentStep,
        courseSystemId,
        levelSystemId,
        stepSystemId,
        screenSystemId,
    ])

    const handleGo = useCallback(
        (nav: NavInfo) => {
            if (!nav.disabled && nav.href) router.push(nav.href)
        },
        [router]
    )

    // חיצי מקלדת = כמו הכפתורים (שמאלה=הבא, ימינה=הקודם)
    useEffect(() => {
        if (!enableKeyboardArrows) return
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
    }, [enableKeyboardArrows, nextNav, prevNav, router])

    return (
        <Stack
            style={{
                flexDirection: 'row',
                gap: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '8px',
            }}
        >
            <MainButton
                label={prevNav.label}
                variant="outlined"
                onClick={() => handleGo(prevNav)}
                color="brand-blue"
                state={prevNav.disabled ? 'disabled' : 'default'}
                style={{
                    width: '120px',
                }}
            />
            <MainButton
                label="בוצע"
                color="brand-orange"
                onClick={() => handleGo(nextNav)}
                style={{
                    width: '160px',
                }}
            />
            <MainButton
                label={nextNav.label}
                color="brand-blue"
                onClick={() => handleGo(nextNav)}
                state={nextNav.disabled ? 'disabled' : 'default'}
                style={{
                    width: '120px',
                }}
            />
        </Stack>
    )
}
