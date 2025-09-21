'use client'

import BackArrowIcon from '@/assets/icons/back-arrow-icon.svg'
import type { CraftiroCourseScreenType } from '@/types/craftiroCourses'
import { Stack, Text } from '@craftiro/ui'
import Image from 'next/image'
import React from 'react'
import {
    getScreenTypeChipBackgroundColor,
    getScreenTypeLabel,
} from '../../screens/[screenSystemId]/_utils/screenType'

type ScreenToolsBarProps = {
    onBack: () => void
    screenTitle: string
    learningTimeSec?: number
    screenType?: CraftiroCourseScreenType
    /** 1-based current screen index (e.g. 2 for "second") */
    currentIndex?: number
    totalScreens?: number
    /** If false, removes sticky positioning (default: true) */
    sticky?: boolean
    /** Override back label text (default: "חזרה לשלב") */
    backLabel?: string
}

export const ScreenToolsBar: React.FC<ScreenToolsBarProps> = ({
    onBack,
    screenTitle,
    learningTimeSec,
    screenType,
    currentIndex,
    totalScreens,
    sticky = true,
    backLabel = 'חזרה לשלב',
}) => {
    const countLabel =
        totalScreens && currentIndex ? `${totalScreens} / ${currentIndex}` : '-'

    return (
        <Stack
            style={{
                height: '60px',
                borderBottom: 'solid 2px var(--color-divider-main)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: sticky ? ('sticky' as const) : 'static',
                top: sticky ? 0 : undefined,
                backgroundColor: 'var(--color-base-white)',
                zIndex: 10,
                padding: '16px 24px',
            }}
        >
            {/* Left block: back + title */}
            <Stack
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                }}
            >
                <button
                    type="button"
                    onClick={onBack}
                    aria-label={backLabel}
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
                        backgroundColor: 'var(--color-intent-primary-main)',
                        cursor: 'pointer',
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
                    {backLabel}
                </Text>

                <Stack
                    style={{
                        width: '2px',
                        height: '40px',
                        backgroundColor: 'var(--color-divider-main)',
                    }}
                />

                <Stack>
                    <Text
                        style={{
                            fontSize: '20px',
                            fontWeight: 800,
                            color: 'var(--color-intent-primary-main)',
                        }}
                    >
                        {screenTitle || ''}
                    </Text>
                </Stack>
            </Stack>

            {/* Right block: time + chip + count */}
            <Stack
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                }}
            >
                {typeof learningTimeSec === 'number' && (
                    <Text>זמן למידה: {learningTimeSec} שניות</Text>
                )}

                <Stack
                    style={{
                        width: '2px',
                        height: '40px',
                        backgroundColor: 'var(--color-divider-main)',
                    }}
                />

                {screenType ? (
                    <Text
                        style={{
                            backgroundColor:
                                getScreenTypeChipBackgroundColor(screenType),
                            padding: '4px 8px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: 600,
                            width: '80px',
                            textAlign: 'center',
                            color: 'var(--color-text-on-background)',
                        }}
                    >
                        {getScreenTypeLabel(screenType)}
                    </Text>
                ) : (
                    <Text
                        style={{
                            padding: '4px 8px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: 600,
                            width: '80px',
                            textAlign: 'center',
                            color: 'var(--color-text-secondary)',
                            border: '1px dashed var(--color-divider-main)',
                        }}
                    >
                        -
                    </Text>
                )}

                <Stack
                    style={{
                        width: '2px',
                        height: '40px',
                        backgroundColor: 'var(--color-divider-main)',
                    }}
                />

                <Text style={{ fontSize: '24px', fontWeight: 600 }}>
                    {countLabel}
                </Text>
            </Stack>
        </Stack>
    )
}
