import { ThemeName } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeStore = {
    currentTheme: ThemeName
    setTheme: (theme: ThemeName) => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            currentTheme: 'light',
            setTheme: (theme) => set({ currentTheme: theme }),
        }),
        {
            name: 'theme', // The key in localStorage
        }
    )
)
