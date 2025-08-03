'use client'

import { exercises } from '@/data/demoData/exercises'
import { Button, Stack, Text } from '@core'
import { useTheme } from '@hooks'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getExerciseBySystemId } from '../utils'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { systemId } = useParams<{ systemId: string }>()
    const pathname = usePathname()
    const theme = useTheme()
    const exercise = getExerciseBySystemId(exercises, systemId)
    const [isMobile, setIsMobile] = useState<boolean | null>(null)

    // Sometimes make a hydration error!!!
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (!exercise) {
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    const { baseDetails } = exercise

    const { description = '', name = 'תרגיל לא מזוהה' } = baseDetails

    if (!exercise) {
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    if (isMobile === null) return null

    return (
        <Stack
            sx={{
                flexDirection: 'column',
                minHeight: '100vh', // TODO: calc 100vh - elementsSizes.mainNavbarHeight. It's not working
                width: '100%',
            }}
        >
            <Stack>
                <Stack>
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '32px',
                            position: 'relative',
                        }}
                    >
                        <Text
                            variant="h2"
                            text={name}
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '48px',
                                marginBottom: '24px',
                            }}
                        />
                        <Text
                            variant="body1"
                            text={description}
                            sx={{ fontWeight: '400', fontSize: '24px' }}
                        />
                        <Text
                            variant="h2"
                            text={systemId}
                            sx={{
                                fontWeight: '400',
                                fontSize: '48px',
                                position: 'absolute',
                                left: '80px',
                                top: '32px',
                            }}
                        />
                    </Stack>

                    <Stack
                        sx={{
                            height: '76px',
                            backgroundColor: theme.background.topNavbar,
                            display: 'flex',
                            padding: '8px',
                            borderTopColor: theme.common.border,
                            borderBottomColor: theme.common.border,
                            borderTopWidth: '2px',
                            borderBottomWidth: '2px',
                            borderTopStyle: 'solid',
                            borderBottomStyle: 'solid',
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
                            }}
                        >
                            <Stack
                                sx={{
                                    position: 'absolute',
                                    right: '16px',
                                }}
                            >
                                <Link href={`/academy/exercises`}>
                                    <Button
                                        variant="outlined"
                                        label="חזרה לכל התרגילים"
                                    />
                                </Link>
                            </Stack>
                            <Link
                                href={`/academy/exercises/${
                                    pathname.split('/')[3]
                                }/info`}
                            >
                                <Button variant="text" label="סקירה כללית" />
                            </Link>
                            <Link
                                href={`/academy/exercises/${
                                    pathname.split('/')[3]
                                }/media`}
                            >
                                <Button variant="text" label="מדיה" />
                            </Link>
                            <Link
                                href={`/academy/exercises/${
                                    pathname.split('/')[3]
                                }/relatedExercises`}
                            >
                                <Button variant="text" label="תרגילים דומים" />
                            </Link>
                            <Link
                                href={`/academy/exercises/${
                                    pathname.split('/')[3]
                                }/score`}
                            >
                                <Button variant="text" label="ניקוד" />
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        height: '60px',
                    }}
                ></Stack>

                {children}
            </Stack>
        </Stack>
    )
}
