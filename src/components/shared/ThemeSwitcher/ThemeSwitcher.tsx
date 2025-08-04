'use client'

import { useThemeStore } from '@/store/themeStore'
import { useUserStore } from '@/store/userStore'
import { themes } from '@/styles'
import { ThemeName } from '@/types'
import { isAdmin } from '@/utils'
import { Button, Stack } from '@core'
import { useState } from 'react'

const themeOptions = Object.keys(themes) as ThemeName[]

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const ThemeSwitcher = () => {
    const { currentTheme, setTheme } = useThemeStore()
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
    const user = useUserStore((state) => state.user)
    const isUserAdmin = isAdmin(user)
    if (!isUserAdmin) return null // Hide the switcher for non-admin users

    const buttonClickHandler = () => {
        setIsThemeMenuOpen((prev) => !prev)
    }

    const closeModal = () => setIsThemeMenuOpen(false)

    const handleSelect = (theme: ThemeName) => {
        setTheme(theme)
        closeModal()
    }

    return (
        <Stack sx={{ position: 'relative', zIndex: 10 }}>
            <Button
                onClick={buttonClickHandler}
                label="תצוגה"
                variant="outlined"
                style={{
                    padding: '4px 12px',
                    fontSize: 16,
                    minWidth: 80,
                }}
            />

            {isThemeMenuOpen && (
                <Stack
                    sx={{
                        position: 'fixed',
                        inset: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.32)', // מעט שקוף
                        zIndex: 3000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* Close button */}
                    <Button
                        label="✕"
                        onClick={closeModal}
                        variant="text"
                        style={{
                            position: 'absolute',
                            top: 24,
                            left: 24,
                            background: 'none',
                            color: 'white',
                            fontSize: 32,
                            minWidth: 32,
                            minHeight: 32,
                            padding: 0,
                        }}
                    />

                    {/* Modal content */}
                    <Stack
                        sx={{
                            background: '#fff',
                            borderRadius: '20px',
                            boxShadow: '0 8px 36px rgba(0,0,0,0.14)',
                            minWidth: 260,
                            padding: '36px 32px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                            position: 'relative',
                        }}
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
                        {themeOptions.map((theme) => (
                            <Button
                                key={theme}
                                label={capitalize(theme)}
                                variant={
                                    theme === currentTheme
                                        ? 'contained'
                                        : 'outlined'
                                }
                                color={
                                    theme === currentTheme
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={() => handleSelect(theme)}
                                fullWidth
                                style={{
                                    marginBottom: 8,
                                    fontWeight: 500,
                                }}
                            />
                        ))}
                    </Stack>
                </Stack>
            )}
        </Stack>
    )
}
