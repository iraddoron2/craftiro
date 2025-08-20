'use client'

import { Button, Stack } from '@craftiro/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
    courseSystemId: string
    levelSystemId: string
    stepSystemId: string
}

const CourseLocalNav = ({
    courseSystemId,
    levelSystemId,
    stepSystemId,
}: Props) => {
    const pathname = usePathname()

    // Use exact path or startsWith — your choice
    const introHref = `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/intro`
    const mapHref = `/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/map`

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href)

    return (
        <Stack
            style={{
                height: '76px',
                backgroundColor: 'var(--color-background-main)',
                display: 'flex',
                padding: '8px',
                borderTop: `2px solid var(--color-border-main)`,
                borderBottom: `2px solid var(--color-border-main)`,
                width: '100%',
            }}
        >
            <Stack
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    position: 'relative',
                    width: '100%',
                }}
            >
                <Stack style={{ position: 'absolute', right: '16px' }}>
                    <Link
                        href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}`}
                    >
                        <Button variant="outlined" label="חזרה לשלב" />
                    </Link>
                </Stack>

                <Link href={introHref}>
                    <Button
                        variant={isActive(introHref) ? 'contained' : 'text'}
                        label="הקדמה לצעד"
                    />
                </Link>
                <Link href={mapHref}>
                    <Button
                        variant={isActive(mapHref) ? 'contained' : 'text'}
                        label="מפת צעדים"
                    />
                </Link>
            </Stack>
        </Stack>
    )
}

export default CourseLocalNav
