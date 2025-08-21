'use client'

import { CurrentPath, LinksGroups } from '@/types'
import { create } from 'zustand'

interface TabsNavbarState {
    linksGroups: LinksGroups
    currentPath: CurrentPath
    updateLinksGroups: (linksGroups: LinksGroups) => void
    updateCurrentPath: (currentPath: CurrentPath) => void
}

export const useTabsNavbar = create<TabsNavbarState>((set) => ({
    linksGroups: [],
    currentPath: '',
    updateLinksGroups: (linksGroups) => set({ linksGroups }),
    updateCurrentPath: (currentPath) => set({ currentPath }),
}))
