'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { Button, Stack, Text } from '@core'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

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

    // Pull courses from store
    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const loading = useCraftiroCoursesStore((s) => s.craftiroCoursesLoading)
    const error = useCraftiroCoursesStore((s) => s.craftiroCoursesError)

    // Find level and steps
    const { level, steps, currentIndex } = useMemo(() => {
        const course = courses.find((c) => c.systemId === courseSystemId)
        const level =
            course?.levels?.find((l) => l.levelSystemId === levelSystemId) ??
            null
        const steps = level?.steps ?? []
        const idx = steps.findIndex((st) => st.stepSystemId === stepSystemId)
        return { level, steps, currentIndex: idx }
    }, [courses, courseSystemId, levelSystemId, stepSystemId])

    // Table columns
    const columns = useMemo<ColumnDef<StepRow>[]>(
        () => [
            {
                accessorKey: 'index',
                header: '#',
                cell: (info) => info.getValue() as number,
            },
            {
                accessorKey: 'title',
                header: 'שם הצעד',
                cell: (info) => {
                    const row = info.row.original
                    // Emphasize current step
                    const isCurrent = row.status === 'current'
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
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => (
                    <Link
                        href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${row.original.systemId}`}
                    >
                        <Button label="פתח צעד" color="primary" />
                    </Link>
                ),
            },
        ],
        [courseSystemId, levelSystemId]
    )

    // Build table data
    const data: StepRow[] = steps.map((st, i) => ({
        index: i + 1,
        title: st.stepTitle || `צעד ${i + 1}`,
        short: st.stepShortDescription || '',
        systemId: st.stepSystemId || '',
        status:
            currentIndex === -1
                ? 'upcoming'
                : i < currentIndex
                ? 'past'
                : i === currentIndex
                ? 'current'
                : 'upcoming',
    }))

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // Loading / error / not found guards
    if (loading) return <Text variant="h2" text="טוען מפת צעדים..." />
    if (error) return <Text variant="h2" text={`שגיאה: ${error}`} />
    if (!level) return <Text variant="h2" text="שלב לא נמצא" />
    if (!steps.length)
        return <Text variant="h2" text="אין צעדים זמינים בשלב זה" />

    // Simple progress percentage
    const progressPercent =
        currentIndex <= 0
            ? 0
            : Math.min(100, Math.round((currentIndex / steps.length) * 100))

    return (
        <Stack sx={{ flexDirection: 'column', gap: '20px', padding: '24px' }}>
            {/* Header + progress */}
            <Stack sx={{ gap: '8px', alignItems: 'center' }}>
                <Text variant="h2" text="מפת צעדים" />
                <Text
                    variant="caption"
                    text={`התקדמות: ${progressPercent}% (${Math.max(
                        0,
                        currentIndex
                    )} / ${steps.length})`}
                    sx={{ color: '#666' }}
                />
            </Stack>

            {/* Table */}
            <Stack
                component="table"
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
                                        textAlign: 'right',
                                        background: '#f8f9fb',
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
                </tbody>
            </Stack>

            {/* CTA back to current step (if current known) */}
            {/* {currentIndex >= 0 && data[currentIndex] && (
                <Stack sx={{ alignItems: 'center' }}>
                    <Link
                        href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}/${data[currentIndex].systemId}/intro`}
                    >
                        <Button label="חזרה לצעד הנוכחי" color="primary" />
                    </Link>
                </Stack>
            )} */}
        </Stack>
    )
}
