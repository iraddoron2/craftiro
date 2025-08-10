'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { Button, Stack, Text } from '@core'
import { Tab, Tabs } from '@mui/material'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

type AnyRecord = Record<string, unknown>

export default function StepScreenPage() {
    // Route params
    const { courseSystemId, levelSystemId, stepSystemId, sceenSystemId } =
        useParams<{
            courseSystemId: string
            levelSystemId: string
            stepSystemId: string
            sceenSystemId: string // note: param name as provided
        }>()
    const router = useRouter()

    // Local tab state
    const [tabValue, setTabValue] = useState(0)

    // Courses from store
    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const loading = useCraftiroCoursesStore((s) => s.craftiroCoursesLoading)
    const error = useCraftiroCoursesStore((s) => s.craftiroCoursesError)

    // Resolve course/level/step
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

    // Normalize ID accessor for screens (handles various field names)
    const getScreenId = useCallback(
        (scr: AnyRecord, fallbackIndex?: number) => {
            return (
                scr?.sceenSystemId ?? // if schema matches route param name
                scr?.screenSystemId ??
                scr?.systemId ??
                scr?._id ??
                (typeof fallbackIndex === 'number'
                    ? `screen-${fallbackIndex}`
                    : '')
            )
        },
        []
    )

    // Screens list + current index
    const { screens, currentIndex } = useMemo(() => {
        const screens = (step?.screens ?? []) as AnyRecord[]
        const idx = screens.findIndex(
            (s, i) => getScreenId(s, i) === sceenSystemId
        )
        return { screens, currentIndex: idx }
    }, [step?.screens, getScreenId, sceenSystemId])

    // Progress (current screen out of total)
    const { totalScreens, progressPercent, progressLabel } = useMemo(() => {
        const total = screens.length
        const currentOrdinal = currentIndex >= 0 ? currentIndex + 1 : 0
        const percent =
            total > 0
                ? Math.max(
                      0,
                      Math.min(100, Math.round((currentOrdinal / total) * 100))
                  )
                : 0
        return {
            totalScreens: total,
            progressPercent: percent,
            progressLabel: `${currentOrdinal} / ${total} (${percent}%)`,
        }
    }, [screens.length, currentIndex])

    // Current screen content
    const currentScreen = useMemo(
        () => (currentIndex >= 0 ? screens[currentIndex] : null),
        [screens, currentIndex]
    )

    // Build neighboring hrefs
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
        // Example: navigate back to step root or to the map
        router.push(
            `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/map`
        )
    }

    // Guards
    if (loading) return <Text variant="h2" text="טוען מסך..." />
    if (error) return <Text variant="h2" text={`שגיאה: ${error}`} />
    if (!course || !level || !step)
        return <Text variant="h2" text="צעד לא נמצא" />
    if (!totalScreens)
        return <Text variant="h2" text="אין מסכים זמינים לצעד זה" />
    if (!currentScreen) return <Text variant="h2" text="מסך לא נמצא" />

    // Step meta
    const stepNumber = (stepIndex ?? -1) >= 0 ? stepIndex + 1 : undefined
    const stepTitle = step?.stepTitle || `צעד ${stepNumber ?? ''}`

    // Basic screen content renderer (extend later as needed)
    const renderScreenContent = (scr: AnyRecord) => {
        // 1) HTML string
        if (typeof scr?.html === 'string' && scr.html.trim()) {
            return (
                <div
                    dangerouslySetInnerHTML={{ __html: scr.html }}
                    style={{ lineHeight: 1.6 }}
                />
            )
        }
        // 2) Paragraph array [{ type:'paragraph', text:'...' }]
        if (Array.isArray(scr?.content)) {
            type ParagraphItem = { id?: string | number; text?: string }
            return (
                <Stack sx={{ gap: '12px' }}>
                    {scr.content.map((item: ParagraphItem, i: number) => (
                        <p key={item?.id || i} style={{ margin: 0 }}>
                            {item?.text ?? ''}
                        </p>
                    ))}
                </Stack>
            )
        }
        // 3) Fallback: pretty-print JSON
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
        <Stack sx={{ flexDirection: 'column', gap: '20px', padding: '24px' }}>
            {/* Header: step name + number */}
            <Stack sx={{ alignItems: 'center', gap: '6px' }}>
                <Text
                    variant="h2"
                    text={`${stepTitle}${
                        typeof stepNumber === 'number'
                            ? ` · #${stepNumber}`
                            : ''
                    }`}
                    sx={{ textAlign: 'center' }}
                />
                <Text
                    variant="caption"
                    text={`קורס: ${course.name ?? course.systemId} · שלב: ${
                        level.levelTitle ?? level.levelSystemId
                    }`}
                    sx={{ color: '#666' }}
                />
            </Stack>

            {/* Tabs */}
            <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
                <Tab label="הקדמה לצעד" />
                <Tab label="מפת צעדים" />
            </Tabs>

            {/* Tab panels */}
            {tabValue === 0 ? (
                <Stack sx={{ alignItems: 'center', gap: '10px' }}>
                    <Text
                        variant="body1"
                        text={step?.stepShortDescription || ''}
                    />
                </Stack>
            ) : (
                <Stack sx={{ alignItems: 'center', gap: '10px' }}>
                    <Link
                        href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/map`}
                    >
                        <Button label="צפה במפת הצעדים" color="primary" />
                    </Link>
                </Stack>
            )}

            {/* Progress bar (custom) */}
            <Stack
                sx={{
                    width: '100%',
                    maxWidth: 720,
                    margin: '0 auto',
                    gap: '8px',
                }}
            >
                <Text
                    variant="caption"
                    text={`התקדמות: ${progressLabel}`}
                    sx={{ color: '#666' }}
                />
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
                sx={{
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

            {/* Navigation buttons */}
            <Stack
                sx={{
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
