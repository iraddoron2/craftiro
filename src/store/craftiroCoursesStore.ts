import { CraftiroCourse } from '@/types/craftiroCourses'
import { create } from 'zustand'

type CraftiroCoursesState = {
    craftiroCourses: CraftiroCourse[]
    craftiroCoursesLoading: boolean
    craftiroCoursesError: string | null
    setCraftiroCourses: (courses: CraftiroCourse[]) => void
    setCraftiroCoursesLoading: (loading: boolean) => void
    setCraftiroCoursesError: (error: string | null) => void
}

export const useCraftiroCoursesStore = create<CraftiroCoursesState>((set) => ({
    // Initial state
    craftiroCourses: [],
    craftiroCoursesLoading: false,
    craftiroCoursesError: null,

    // Actions
    setCraftiroCourses: (courses) => set({ craftiroCourses: courses }),
    setCraftiroCoursesLoading: (loading) =>
        set({ craftiroCoursesLoading: loading }),
    setCraftiroCoursesError: (error) => set({ craftiroCoursesError: error }),
}))
