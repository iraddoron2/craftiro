import { CraftiroCourse } from '@/types/craftiroCourses'
import { create } from 'zustand'

interface CoursesState {
    courses: CraftiroCourse[]
    isLoading: boolean
    error: Error | null
    setCourses: (courses: CraftiroCourse[]) => void
    setLoading: (loading: boolean) => void
    setError: (error: Error | null) => void
    clearCourses: () => void
}

export const useCoursesStore = create<CoursesState>((set) => ({
    courses: [],
    isLoading: false,
    error: null,
    setCourses: (courses) => set({ courses }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearCourses: () => set({ courses: [], isLoading: false, error: null }),
}))
