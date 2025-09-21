'use client'

import BackArrowIcon from '@/assets/icons/back-arrow-icon.svg'
import MyCoursesIcon from '@/assets/icons/my-courses-icon.svg'
import ProgressionIconUrl from '@/assets/icons/progression-icon.svg'
import SearchIconUrl from '@/assets/icons/search-icon.svg'
import StatsIconUrl from '@/assets/icons/stats-icon.svg'
import { Stack, Text } from '@craftiro/ui'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

type Props = {
    backUrl?: string
    backLabel?: string
    isBackButton?: boolean
}

export const CourseSubNavbar = ({
    backUrl,
    backLabel,
    isBackButton = false,
}: Props) => {
    const router = useRouter()
    const handleNavigate = (path: string) => {
        router.push(path)
    }

    return (
        <>
            <Stack
                style={{
                    width: 'calc(100% - 48px)',
                    margin: '0 24px 24px',
                    borderRadius: '16px',
                    borderStyle: 'solid',
                    borderWidth: '2px',
                    borderColor: 'var(--color-divider-main)',
                    height: '80px',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: isBackButton ? 'space-between' : 'flex-end',
                    padding: '0 12px',
                    gap: '12px',
                    position: 'sticky',
                    top: '80px',
                }}
            >
                {isBackButton && (
                    <Stack
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                        }}
                    >
                        {/* Icon button: Back */}
                        <button
                            type="button"
                            onClick={() =>
                                handleNavigate(
                                    backUrl || '/academy/courses/my-courses'
                                )
                            }
                            aria-label={backLabel || 'חזרה לקורסים שלי'}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                borderStyle: 'solid',
                                borderWidth: '2px',
                                borderColor: 'var(--color-text-on-background)',
                                background: 'transparent',
                                cursor: 'pointer',
                                backgroundColor:
                                    'var(--color-intent-primary-main)',
                            }}
                        >
                            <Image
                                src={BackArrowIcon}
                                alt="Back"
                                width={24}
                                height={24}
                            />
                        </button>

                        <Text variant="h4" style={{ fontWeight: 600 }}>
                            {backLabel || 'חזרה לקורסים שלי'}
                        </Text>
                    </Stack>
                )}

                <Stack
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                    }}
                >
                    {/* Icon button: My Courses */}
                    <button
                        type="button"
                        onClick={() =>
                            handleNavigate('/academy/courses/my-courses')
                        }
                        aria-label="הקורסים שלי"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            borderStyle: 'solid',
                            borderWidth: '2px',
                            borderColor: 'var(--color-text-on-background)',
                            background: 'transparent',
                            cursor: 'pointer',
                            backgroundColor: 'var(--color-intent-primary-main)',
                        }}
                    >
                        <Image
                            src={MyCoursesIcon}
                            alt="My Courses"
                            width={24}
                            height={24}
                        />
                    </button>

                    {/* Icon button: Search */}
                    <button
                        type="button"
                        onClick={() =>
                            handleNavigate('/academy/courses/search')
                        }
                        aria-label="חיפוש קורסים"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            borderStyle: 'solid',
                            borderWidth: '2px',
                            borderColor: 'var(--color-text-on-background)',
                            background: 'transparent',
                            cursor: 'pointer',
                            backgroundColor: 'var(--color-intent-primary-main)',
                        }}
                    >
                        <Image
                            src={SearchIconUrl}
                            alt="Search"
                            width={24}
                            height={24}
                        />
                    </button>

                    {/* Icon button: Progression */}
                    <button
                        type="button"
                        onClick={() =>
                            handleNavigate('/academy/courses/progress')
                        }
                        aria-label="הקורסים שלי"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            borderStyle: 'solid',
                            borderWidth: '2px',
                            borderColor: 'var(--color-text-on-background)',
                            background: 'transparent',
                            cursor: 'pointer',
                            backgroundColor: 'var(--color-intent-primary-main)',
                        }}
                    >
                        <Image
                            src={ProgressionIconUrl}
                            alt="Progression"
                            width={24}
                            height={24}
                        />
                    </button>
                    {/* Icon button: Stats */}
                    <button
                        type="button"
                        onClick={() => handleNavigate('/academy/courses/stats')}
                        aria-label="סטטיסטיקות הקורסים"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            borderStyle: 'solid',
                            borderWidth: '2px',
                            borderColor: 'var(--color-text-on-background)',
                            background: 'transparent',
                            cursor: 'pointer',
                            backgroundColor: 'var(--color-intent-primary-main)',
                        }}
                    >
                        <Image
                            src={StatsIconUrl}
                            alt="Stats"
                            width={24}
                            height={24}
                        />
                    </button>
                </Stack>
            </Stack>
        </>
    )
}
