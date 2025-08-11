'use client'

import { Button, Stack } from '@core'
import { useTheme } from '@hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
    courseSystemId: string
    levelSystemId: string
    stepSystemId: string
}

/** Local nav bar for a single course */
export const CourseLocalNav = ({
    courseSystemId,
    levelSystemId,
    stepSystemId,
}: Props) => {
    const theme = useTheme()
    const pathname = usePathname()

    // Decide which tab is active by current pathname
    const isActive = (href: string) => pathname.startsWith(href)

    const introHref = `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/intro`
    const levelsHref = `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/steps-map`

    return (
        <Stack
            sx={{
                height: '76px',
                backgroundColor: theme.background.topNavbar,
                display: 'flex',
                padding: '8px',
                borderTop: `2px solid ${theme.common?.border}`,
                borderBottom: `2px solid ${theme.common?.border}`,
                width: '100%',
            }}
        >
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    position: 'relative',
                    width: '100%',
                }}
            >
                {/* Back to all courses */}
                <Stack sx={{ position: 'absolute', right: '16px' }}>
                    <Link
                        href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}`}
                    >
                        <Button variant="outlined" label="חזרה לשלב" />
                    </Link>
                </Stack>

                {/* Tabs */}
                <Link href={introHref}>
                    <Button
                        // visually emphasize active tab
                        variant={isActive(introHref) ? 'contained' : 'text'}
                        label="הקדמה לצעד"
                    />
                </Link>
                <Link href={levelsHref}>
                    <Button
                        variant={isActive(levelsHref) ? 'contained' : 'text'}
                        label="מפת צעדים"
                    />
                </Link>
            </Stack>
        </Stack>
    )
}
