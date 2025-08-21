'use client'

import { useThemeStore } from '@/store/themeStore'
import { useUserStore } from '@/store/userStore'
import { themes } from '@/styles'
import { ThemeName } from '@/types'
import { isAdmin } from '@/utils'
import { Button, Stack } from '@craftiro/ui'
import { useEffect, useState } from 'react'

type ThemeChoice = ThemeName | 'system'
const THEME_STORAGE_KEY = 'craftiro:theme'
const THEME_OPTIONS: ThemeChoice[] = [
    'system',
    ...(Object.keys(themes) as ThemeName[]),
]

const isAlwaysLight = true // TODO: remove this when we support dark theme

function detectSystemTheme(): ThemeName {
    if (typeof window === 'undefined') return 'light'
    if (isAlwaysLight) return 'light'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
}

function setHtmlTheme(theme: ThemeName) {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
}

function labelize(name: ThemeChoice) {
    return name === 'system'
        ? 'System'
        : name.charAt(0).toUpperCase() + name.slice(1)
}

export const ThemeSwitcher = () => {
    const { currentTheme, setTheme } = useThemeStore()
    const [isOpen, setOpen] = useState(false)
    const [choice, setChoice] = useState<ThemeChoice>(() => {
        if (typeof window === 'undefined') return 'system'
        return (
            (localStorage.getItem(THEME_STORAGE_KEY) as ThemeChoice) || 'system'
        )
    })

    // אתחול והחלת תמה בתחילת טעינה
    useEffect(() => {
        const saved =
            (localStorage.getItem(THEME_STORAGE_KEY) as ThemeChoice) || 'system'
        setChoice(saved)

        const initialTheme =
            saved === 'system' ? detectSystemTheme() : (saved as ThemeName)
        setTheme(initialTheme)
        setHtmlTheme(initialTheme)
    }, [setTheme])

    // אם המשתמש במצב "system" – האזן לשינויי מערכת ועדכן data-theme וה־store
    useEffect(() => {
        if (choice !== 'system') return
        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => {
            const t = mql.matches ? 'dark' : 'light'
            setTheme(t)
            setHtmlTheme(t)
        }
        mql.addEventListener?.('change', handler)
        return () => mql.removeEventListener?.('change', handler)
    }, [choice, setTheme])

    // כל שינוי ב־currentTheme → סנכרון ל־<html data-theme="...">
    useEffect(() => {
        if (!currentTheme) return
        setHtmlTheme(currentTheme)
    }, [currentTheme])
    const user = useUserStore((s) => s.user)
    const isUserAdmin = isAdmin(user)
    if (!isUserAdmin) return null

    const handleSelect = (next: ThemeChoice) => {
        setChoice(next)
        localStorage.setItem(THEME_STORAGE_KEY, next)

        const t = next === 'system' ? detectSystemTheme() : next
        setTheme(t)
        setHtmlTheme(t)
        setOpen(false)
    }

    const overlayBg = 'var(--color-overlay-scrim, rgba(0,0,0,0.32))'
    const modalBg = 'var(--color-background-main, #fff)'
    const modalShadow =
        'var(--shadow-elevation-30, 0 16px 48px rgba(0,0,0,0.14))'
    const modalRadius = 'var(--radius-lg, 20px)'
    const textOnBg = 'var(--color-text-onBackground, currentColor)'

    return (
        <Stack style={{ position: 'relative', zIndex: 10 }}>
            <Button
                onClick={() => setOpen((p) => !p)}
                label="תצוגה"
                variant="outlined"
                style={{ padding: '4px 12px', fontSize: 16, minWidth: 80 }}
            />

            {isOpen && (
                <Stack
                    as="dialog"
                    aria-modal="true"
                    aria-label="בחרו תצוגה"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        width: '100vw',
                        height: '100vh',
                        background: overlayBg,
                        zIndex: 3000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={() => setOpen(false)}
                >
                    <Button
                        label="✕"
                        onClick={() => setOpen(false)}
                        variant="text"
                        style={{
                            position: 'absolute',
                            top: 24,
                            left: 24,
                            background: 'none',
                            color: 'var(--color-text-onContrastBackground, #fff)',
                            fontSize: 32,
                            minWidth: 32,
                            minHeight: 32,
                            padding: 0,
                        }}
                    />

                    <Stack
                        style={{
                            background: modalBg,
                            borderRadius: modalRadius,
                            boxShadow: modalShadow,
                            minWidth: 260,
                            padding: '36px 32px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            position: 'relative',
                            color: textOnBg,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            style={{
                                fontWeight: 600,
                                fontSize: 22,
                                marginBottom: 8,
                            }}
                        >
                            בחרו תצוגה
                        </div>

                        {THEME_OPTIONS.map((opt) => {
                            const isCurrent =
                                opt === 'system'
                                    ? choice === 'system'
                                    : opt === currentTheme
                            return (
                                <Button
                                    key={opt}
                                    label={labelize(opt)}
                                    variant={
                                        isCurrent ? 'contained' : 'outlined'
                                    }
                                    color={isCurrent ? 'primary' : 'default'}
                                    onClick={() => handleSelect(opt)}
                                    fullWidth
                                    style={{ marginBottom: 4, fontWeight: 500 }}
                                />
                            )
                        })}

                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 12,
                                opacity: 0.7,
                                textAlign: 'center',
                            }}
                        >
                            מצב <b>System</b> מסתנכרן אוטומטית עם הגדרת מערכת
                            ההפעלה/הדפדפן.
                        </div>
                    </Stack>
                </Stack>
            )}
        </Stack>
    )
}
