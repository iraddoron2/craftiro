'use client'

import { useThemeStore } from '@/store/themeStore'
import { themes } from '@/styles'
import { ThemeName } from '@/types'

const themeOptions = Object.keys(themes) as ThemeName[]

export const ThemeSwitcher = () => {
    const { currentTheme, setTheme } = useThemeStore()

    return (
        <div style={{ display: 'flex', gap: 8 }}>
            {themeOptions.map((theme) => (
                <button
                    key={theme}
                    onClick={() => setTheme(theme)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        background: currentTheme === theme ? '#2266C7' : '#eee',
                        color: currentTheme === theme ? 'white' : '#222',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 500,
                        transition: 'background 0.15s',
                    }}
                >
                    {theme}
                </button>
            ))}
        </div>
    )
}
