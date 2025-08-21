import { LinksGroups } from '@/types'
import { create } from 'zustand'

type TabsNavbarState = {
    currentPath: string
    linksGroups: LinksGroups
    updateCurrentPath: (p: string) => void
    updateLinksGroups: (g: LinksGroups) => void
}

export const useTabsNavbarStore = create<TabsNavbarState>((set) => ({
    currentPath: '',
    linksGroups: [[]],
    updateCurrentPath: (p) => set({ currentPath: p }),
    updateLinksGroups: (g) => set({ linksGroups: g }),
}))
