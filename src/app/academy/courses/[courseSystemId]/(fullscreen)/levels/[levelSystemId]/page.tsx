'use client'

import { MiroHeader } from '@/components/shared'
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
import { CourseLocalNav, Description } from './_components'

type StepRow = {
    stepNumber: number
    stepTitle: string
    stepDescription: string
    stepSystemId: string
}

export default function LevelPage() {
    const { courseSystemId, levelSystemId } = useParams<{
        courseSystemId: string
        levelSystemId: string
    }>()

    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)

    const levelData = useMemo(() => {
        const course = courses.find((c) => c.systemId === courseSystemId)
        if (!course) return null
        return (
            course.levels?.find((l) => l.levelSystemId === levelSystemId) ??
            null
        )
    }, [courses, courseSystemId, levelSystemId])

    // Define columns for TanStack Table (stable via useMemo)
    const columns = useMemo<ColumnDef<StepRow>[]>(
        () => [
            {
                accessorKey: 'stepNumber',
                header: '#',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'stepTitle',
                header: 'שם הצעד',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'stepDescription',
                header: 'תיאור',
                cell: (info) => info.getValue(),
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => (
                    <Link
                        href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${row.original.stepSystemId}/intro`}
                    >
                        <Button label="כניסה לצעד" color="primary" />
                    </Link>
                ),
            },
        ],
        [courseSystemId, levelSystemId]
    )

    // Map steps to table rows (memoized). If no levelData => empty array.
    const data: StepRow[] = useMemo(() => {
        const steps = levelData?.steps ?? []
        return steps.map((step, idx) => ({
            stepNumber: idx + 1,
            stepTitle: step.stepTitle || `צעד ${idx + 1}`,
            stepDescription: step.stepShortDescription || '',
            stepSystemId: step.stepSystemId || '',
        }))
    }, [levelData])

    // Create table AFTER data is defined
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (!levelData) {
        return <Text variant="h2" text="השלב לא נמצא" />
    }

    const { levelTitle, levelShortDescription, levelLongDescription } =
        levelData

    return (
        <Stack sx={{ flexDirection: 'column' }}>
            <MiroHeader
                title={`שלב ${levelSystemId}: ${levelTitle}`}
                subtitle={levelShortDescription}
            />

            {/* Local Navigation */}
            <CourseLocalNav courseSystemId={courseSystemId} />
            <Stack
                sx={{
                    marginTop: '80px',
                    gap: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Description description={levelLongDescription} />

                {/* Steps table */}
                <table
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                        borderRadius: '12px',
                        borderCollapse: 'collapse',
                        backgroundColor: '#fff',
                        borderWidth: '2px',
                        borderColor: '#ddd',
                        borderStyle: 'solid',
                    }}
                >
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        style={{
                                            borderBottom: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        style={{
                                            borderBottom: '1px solid #eee',
                                            padding: '8px',
                                            verticalAlign: 'middle',
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Stack>
        </Stack>
    )
}
