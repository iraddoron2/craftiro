'use client'

import { themes } from '@/styles' // מכיל את כל ה־themes
import { Stack } from '@core'
import { ThemeSwitcher } from '@shared'
import { useThemeStore } from '@store'
import React from 'react'

type PageContainerProps = {
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string
}

export const PageContainer: React.FC<PageContainerProps> = ({
    children,
    style,
    className,
}) => {
    // 1. Get current theme name (e.g. 'light', 'dark', etc.)
    const themeName = useThemeStore((state) => state.currentTheme)
    // 2. Get the theme object itself
    const theme = themes[themeName]

    return (
        <Stack
            style={{
                minHeight: '100vh',
                width: '100%',
                margin: '0 auto',
                // padding: '32px 16px',
                background: theme.background.page, // מתוך ה-theme
                color: theme.text.onPageBackground,
                ...style,
            }}
            className={className}
        >
            <Stack
                sx={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 1000, // לוודא שזה מעל כל דבר אחר
                }}
            >
                <ThemeSwitcher />
            </Stack>
            {children}
        </Stack>
    )
}
