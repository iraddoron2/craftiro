'use client'

import { useCraftiroExercises } from '@/context/craftiroExercisesContext'
import { Button, Stack, Text } from '@core'
import { useTheme } from '@hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { exercises } = useCraftiroExercises()
    const { systemId } = useParams<{ systemId: string }>()
    const theme = useTheme()
    const [isMobile, setIsMobile] = useState<boolean | null>(null)

    // איתור תרגיל לפי systemId (או לפי _id אם צריך)
    const exercise = exercises.find(
        (ex) => ex.systemId === systemId || ex._id === systemId
    )

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
    if (isMobile === null) return null

    const { baseDetails } = exercise
    const { description = '', name = 'תרגיל לא מזוהה' } = baseDetails

    return (
        <Stack
            sx={{
                flexDirection: 'column',
                minHeight: '100vh',
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

                    {/* סרגל ניווט */}
                    <Stack
                        sx={{
                            height: '76px',
                            backgroundColor: theme.background.topNavbar,
                            display: 'flex',
                            padding: '8px',
                            borderTopColor: theme.common?.border,
                            borderBottomColor: theme.common?.border,
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
                            {/* ניווט לדפי התרגיל */}
                            <Link href={`/academy/exercises/${systemId}/info`}>
                                <Button variant="text" label="סקירה כללית" />
                            </Link>
                            <Link href={`/academy/exercises/${systemId}/media`}>
                                <Button variant="text" label="מדיה" />
                            </Link>
                            <Link
                                href={`/academy/exercises/${systemId}/relatedExercises`}
                            >
                                <Button variant="text" label="תרגילים דומים" />
                            </Link>
                            <Link href={`/academy/exercises/${systemId}/score`}>
                                <Button variant="text" label="ניקוד" />
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack sx={{ height: '60px' }}></Stack>
                {/* <pre>{JSON.stringify(exercise, null, 2)}</pre> */}
                {children}
            </Stack>
        </Stack>
    )
}
