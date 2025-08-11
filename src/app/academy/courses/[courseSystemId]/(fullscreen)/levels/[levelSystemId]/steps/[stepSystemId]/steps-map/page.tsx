'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { Button, Stack, Text } from '@core'
import { MiroHeader } from '@shared'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { CourseLocalNav } from '../_components'

type StepRow = {
    index: number
    title: string
    short: string
    systemId: string
    status: 'past' | 'current' | 'upcoming'
}

export default function StepMapPage() {
    // Route params
    const { courseSystemId, levelSystemId, stepSystemId } = useParams<{
        courseSystemId: string
        levelSystemId: string
        stepSystemId: string
    }>()

    // Store slices
    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const loading = useCraftiroCoursesStore((s) => s.craftiroCoursesLoading)
    const error = useCraftiroCoursesStore((s) => s.craftiroCoursesError)

    // Resolve level & steps (memoized)
    const { levelTitle, steps, currentIndex } = useMemo(() => {
        const course = courses.find((c) => c.systemId === courseSystemId)
        const level = course?.levels?.find(
            (l) => l.levelSystemId === levelSystemId
        )
        const steps = level?.steps ?? []
        const idx = steps.findIndex((st) => st.stepSystemId === stepSystemId)
        return {
            levelTitle: level?.levelTitle ?? '',
            steps,
            currentIndex: idx, // -1 when not found
        }
    }, [courses, courseSystemId, levelSystemId, stepSystemId])

    // Build table data (memoized)
    const data: StepRow[] = useMemo(() => {
        return steps.map((st, i) => {
            let status: StepRow['status'] = 'upcoming'
            if (currentIndex >= 0) {
                if (i < currentIndex) status = 'past'
                else if (i === currentIndex) status = 'current'
            }
            return {
                index: i + 1,
                title: st.stepTitle || `צעד ${i + 1}`,
                short: st.stepShortDescription || '',
                systemId: st.stepSystemId || '',
                status,
            }
        })
    }, [steps, currentIndex])

    // Table columns (memoized)
    const columns = useMemo<ColumnDef<StepRow>[]>(
        () => [
            {
                accessorKey: 'index',
                header: '#',
                cell: (info) => info.getValue<number>(),
                meta: { align: 'center' },
            },
            {
                accessorKey: 'title',
                header: 'שם הצעד',
                cell: (info) => {
                    const isCurrent = info.row.original.status === 'current'
                    return (
                        <span style={{ fontWeight: isCurrent ? 700 : 500 }}>
                            {info.getValue<string>()}
                        </span>
                    )
                },
            },
            {
                accessorKey: 'short',
                header: 'תיאור קצר',
                cell: (info) => info.getValue<string>(),
            },
            {
                accessorKey: 'status',
                header: 'סטטוס',
                cell: (info) => {
                    const s = info.getValue<'past' | 'current' | 'upcoming'>()
                    const label =
                        s === 'past'
                            ? 'הושלם'
                            : s === 'current'
                            ? 'נוכחי'
                            : 'קרוב'
                    return <span>{label}</span>
                },
                meta: { align: 'center' },
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => (
                    <Link
                        href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${row.original.systemId}/intro`}
                    >
                        <Button label="פתח צעד" color="primary" />
                    </Link>
                ),
                meta: { align: 'center' },
            },
        ],
        [courseSystemId, levelSystemId]
    )

    // Create table instance
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // Guards
    if (loading) {
        return <Text variant="h2" text="טוען מפת צעדים..." />
    }
    if (error) {
        return <Text variant="h2" text={`שגיאה: ${error}`} />
    }
    if (!steps.length) {
        return <Text variant="h2" text="אין צעדים זמינים בשלב זה" />
    }

    const currentCourse = courses.find(
        (course) => course.systemId === courseSystemId
    )

    const currentLevel = currentCourse?.levels?.find(
        (level) => level.levelSystemId === levelSystemId
    )

    const currentStep = currentLevel?.steps?.find(
        (step) => step.stepSystemId === stepSystemId
    )
    if (!currentStep) {
        return <Text variant="h2" text="הצעד לא נמצא" />
    }

    const { stepTitle, stepShortDescription } = currentStep

    // Progress: if currentIndex == -1, assume 0%; else completed = currentIndex+1
    const progressPercent =
        steps.length === 0
            ? 0
            : currentIndex < 0
            ? 0
            : Math.min(
                  100,
                  Math.round(((currentIndex + 1) / steps.length) * 100)
              )

    return (
        <Stack sx={{ flexDirection: 'column' }}>
            <MiroHeader
                title={`צעד ${stepSystemId}: ${stepTitle}`}
                subtitle={stepShortDescription}
            />
            <CourseLocalNav
                courseSystemId={courseSystemId}
                levelSystemId={levelSystemId}
                stepSystemId={stepSystemId}
            />

            {/* Header + progress */}
            <Stack sx={{ gap: '8px', alignItems: 'center' }}>
                <Text
                    variant="h2"
                    text={`מפת צעדים${levelTitle ? ` · ${levelTitle}` : ''}`}
                />
                <Text
                    variant="caption"
                    text={`התקדמות: ${progressPercent}% (${Math.max(
                        0,
                        currentIndex + 1
                    )} / ${steps.length})`}
                    sx={{ color: '#666' }}
                />
            </Stack>

            {/* Table */}
            <Stack
                component="table"
                role="table"
                aria-label="מפת צעדים"
                sx={{
                    width: '100%',
                    maxWidth: '1100px',
                    margin: '0 auto',
                    borderCollapse: 'collapse',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                }}
            >
                <thead>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((h) => (
                                <th
                                    key={h.id}
                                    style={{
                                        borderBottom: '1px solid #ddd',
                                        padding: '10px',
                                        textAlign:
                                            (
                                                h.column.columnDef as {
                                                    meta?: {
                                                        align?:
                                                            | 'center'
                                                            | 'right'
                                                            | 'left'
                                                    }
                                                }
                                            )?.meta?.align ?? 'right',
                                        background: '#f8f9fb',
                                        fontWeight: 700,
                                    }}
                                >
                                    {flexRender(
                                        h.column.columnDef.header,
                                        h.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((r) => {
                        const isCurrent = r.original.status === 'current'
                        const rowStyle: React.CSSProperties = isCurrent
                            ? { background: 'rgba(34,102,199,0.06)' }
                            : {}
                        return (
                            <tr key={r.id} style={rowStyle}>
                                {r.getVisibleCells().map((c) => (
                                    <td
                                        key={c.id}
                                        style={{
                                            borderBottom: '1px solid #eee',
                                            padding: '10px',
                                            verticalAlign: 'middle',
                                            textAlign:
                                                (
                                                    c.column.columnDef as {
                                                        meta?: {
                                                            align?:
                                                                | 'center'
                                                                | 'right'
                                                                | 'left'
                                                        }
                                                    }
                                                )?.meta?.align ?? 'right',
                                        }}
                                    >
                                        {flexRender(
                                            c.column.columnDef.cell,
                                            c.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                    {/* Empty state row (unlikely here, but safe) */}
                    {!table.getRowModel().rows.length && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                style={{ padding: 16, textAlign: 'center' }}
                            >
                                אין נתונים להצגה
                            </td>
                        </tr>
                    )}
                </tbody>
            </Stack>

            {/* Optional: back to current step CTA */}
            {currentIndex >= 0 && data[currentIndex] && (
                <Stack sx={{ alignItems: 'center' }}>
                    <Link
                        href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${data[currentIndex].systemId}/intro`}
                    >
                        <Button label="חזרה לצעד הנוכחי" color="primary" />
                    </Link>
                </Stack>
            )}
        </Stack>
    )
}
