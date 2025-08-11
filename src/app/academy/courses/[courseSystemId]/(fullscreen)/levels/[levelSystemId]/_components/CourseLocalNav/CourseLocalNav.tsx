'use client'

import { Button, Stack } from '@core'
import { useTheme } from '@hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** Local nav bar for a single course */
export const CourseLocalNav = ({
    courseSystemId,
}: {
    courseSystemId: string
}) => {
    const theme = useTheme()
    const pathname = usePathname()

    // Decide which tab is active by current pathname
    const isActive = (href: string) => pathname.startsWith(href)

    const introHref = `/academy/courses/${courseSystemId}/intro`
    const levelsHref = `/academy/courses/${courseSystemId}/levels`

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
                    <Link href="/academy/courses">
                        <Button variant="outlined" label="חזרה לכל הקורסים" />
                    </Link>
                </Stack>

                {/* Tabs */}
                <Link href={introHref}>
                    <Button
                        // visually emphasize active tab
                        variant={isActive(introHref) ? 'contained' : 'text'}
                        label="הקדמה לקורס"
                    />
                </Link>
                <Link href={levelsHref}>
                    <Button
                        variant={isActive(levelsHref) ? 'contained' : 'text'}
                        label="שלבים"
                    />
                </Link>
            </Stack>
        </Stack>
    )
}
