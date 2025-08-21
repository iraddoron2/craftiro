'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { Button, Stack, Text } from '@craftiro/ui'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

/** Minimal screen shape fallback */
type ScreenRecord = {
    screenSystemId?: string
    systemId?: string
    _id?: string
    html?: string
    content?: Array<{ id?: string | number; text?: string }>
    [k: string]: unknown
}

export default function StepScreenPage() {
    // Route params (ensure correct param name: screenSystemId)
    const { courseSystemId, levelSystemId, stepSystemId, screenSystemId } =
        useParams<{
            courseSystemId: string
            levelSystemId: string
            stepSystemId: string
            screenSystemId: string
        }>()

    const router = useRouter()

    // Store slices
    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const loading = useCraftiroCoursesStore((s) => s.craftiroCoursesLoading)
    const error = useCraftiroCoursesStore((s) => s.craftiroCoursesError)

    // Resolve course/level/step (memoized)
    const { course, level, step, stepIndex } = useMemo(() => {
        const course =
            courses.find((c) => c.systemId === courseSystemId) ?? null
        const level =
            course?.levels?.find((l) => l.levelSystemId === levelSystemId) ??
            null
        const step =
            level?.steps?.find((st) => st.stepSystemId === stepSystemId) ?? null
        const stepIndex = level?.steps
            ? level.steps.findIndex((st) => st.stepSystemId === stepSystemId)
            : -1
        return { course, level, step, stepIndex }
    }, [courses, courseSystemId, levelSystemId, stepSystemId])

    // Screen id resolver (robust to schema drift)
    const getScreenId = useCallback(
        (scr: ScreenRecord | undefined, i?: number) => {
            return (
                scr?.screenSystemId ??
                scr?.systemId ??
                scr?._id ??
                (typeof i === 'number' ? `screen-${i}` : '')
            )
        },
        []
    )

    // Screens list + current index (memoized)
    const { screens, currentIndex } = useMemo(() => {
        const list = (step?.screens ?? []) as ScreenRecord[]
        const idx = list.findIndex(
            (s, i) => getScreenId(s, i) === screenSystemId
        )
        return { screens: list, currentIndex: idx }
    }, [step?.screens, getScreenId, screenSystemId])

    // Current screen data (memoized)
    const currentScreen = useMemo(
        () => (currentIndex >= 0 ? screens[currentIndex] : null),
        [screens, currentIndex]
    )

    // Progress calculation
    const { totalScreens, progressPercent, progressLabel } = useMemo(() => {
        const total = screens.length
        const ord = currentIndex >= 0 ? currentIndex + 1 : 0
        const pct =
            total > 0
                ? Math.min(100, Math.max(0, Math.round((ord / total) * 100)))
                : 0
        return {
            totalScreens: total,
            ordinal: ord,
            progressPercent: pct,
            progressLabel: `${ord} / ${total} (${pct}%)`,
        }
    }, [screens.length, currentIndex])

    // Navigation helpers
    const makeHref = useCallback(
        (nextIndex: number) => {
            const id = getScreenId(screens[nextIndex], nextIndex)
            return `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/screens/${id}`
        },
        [courseSystemId, levelSystemId, stepSystemId, screens, getScreenId]
    )

    const canGoPrev = currentIndex > 0
    const canGoNext = currentIndex >= 0 && currentIndex < totalScreens - 1

    const goPrev = () => {
        if (!canGoPrev) return
        router.push(makeHref(currentIndex - 1))
    }
    const goNext = () => {
        if (!canGoNext) return
        router.push(makeHref(currentIndex + 1))
    }
    const onDone = () => {
        router.push(
            `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/map`
        )
    }

    // Guards
    if (loading) return <Text variant="h2">טוען מסך...</Text>
    if (error) return <Text variant="h2">שגיאה: {error}</Text>
    if (!course || !level || !step) return <Text variant="h2">צעד לא נמצא</Text>
    if (!totalScreens) return <Text variant="h2">אין מסכים זמינים לצעד זה</Text>
    if (!currentScreen) return <Text variant="h2">מסך לא נמצא</Text>

    // Step meta
    const stepNumber = stepIndex >= 0 ? stepIndex + 1 : undefined
    const stepTitle = step.stepTitle || `צעד ${stepNumber ?? ''}`

    // Basic screen renderer (extend with screenType when available)
    const renderScreenContent = (scr: ScreenRecord) => {
        // 1) Raw HTML
        if (typeof scr.html === 'string' && scr.html.trim()) {
            return (
                <div
                    dangerouslySetInnerHTML={{ __html: scr.html }}
                    style={{ lineHeight: 1.6 }}
                />
            )
        }
        // 2) Paragraph array
        if (Array.isArray(scr.content)) {
            return (
                <Stack style={{ gap: '12px' }}>
                    {scr.content.map((item, i) => (
                        <p
                            key={(item?.id as string) ?? i}
                            style={{ margin: 0 }}
                        >
                            {(item as { id?: string | number; text?: string })
                                ?.text ?? ''}
                        </p>
                    ))}
                </Stack>
            )
        }
        // 3) Fallback JSON
        return (
            <pre
                style={{
                    background: '#f7f8fa',
                    border: '1px solid #e6e9ef',
                    borderRadius: 8,
                    padding: 12,
                    maxHeight: 420,
                    overflow: 'auto',
                }}
            >
                {JSON.stringify(scr, null, 2)}
            </pre>
        )
    }

    return (
        <Stack
            style={{ flexDirection: 'column', gap: '20px', padding: '24px' }}
        >
            {/* Header: step name + number */}
            <Stack style={{ alignItems: 'center', gap: '6px' }}>
                <Text variant="h2" style={{ textAlign: 'center' }}>
                    {stepTitle}
                    {typeof stepNumber === 'number' ? ` · #${stepNumber}` : ''}
                </Text>
            </Stack>

            {/* Progress bar */}
            <Stack
                style={{
                    width: '100%',
                    maxWidth: 720,
                    margin: '0 auto',
                    gap: '8px',
                }}
            >
                <Text variant="caption" style={{ color: '#666' }}>
                    התקדמות: {progressLabel}
                </Text>
                <div
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progressPercent}
                    style={{
                        width: '100%',
                        height: 12,
                        background: '#ECEFF4',
                        borderRadius: 999,
                        overflow: 'hidden',
                        border: '1px solid #D8DEE9',
                    }}
                >
                    <div
                        style={{
                            width: `${progressPercent}%`,
                            height: '100%',
                            background: '#2266C7',
                            transition: 'width 200ms ease',
                        }}
                    />
                </div>
            </Stack>

            {/* Screen content */}
            <Stack
                style={{
                    background: '#fff',
                    border: '1px solid #E6E9EF',
                    borderRadius: '12px',
                    padding: '20px',
                    maxWidth: 900,
                    margin: '0 auto',
                }}
            >
                {renderScreenContent(currentScreen)}
            </Stack>

            {/* Navigation */}
            <Stack
                style={{
                    flexDirection: 'row',
                    gap: '12px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '8px',
                }}
            >
                <Button
                    label="מסך קודם"
                    variant="outlined"
                    onClick={goPrev}
                    disabled={!canGoPrev}
                />
                <Button label="בוצע" color="secondary" onClick={onDone} />
                <Button
                    label="מסך הבא"
                    color="primary"
                    onClick={goNext}
                    disabled={!canGoNext}
                />
            </Stack>
        </Stack>
    )
}
