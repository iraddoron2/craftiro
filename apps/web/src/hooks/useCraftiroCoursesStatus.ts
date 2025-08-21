import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'

/** Centralized selectors for courses status */
export const useCraftiroCoursesStatus = () => {
    const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const craftiroCoursesLoading = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesLoading
    )
    const craftiroCoursesError = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesError
    )

    return { craftiroCourses, craftiroCoursesLoading, craftiroCoursesError }
}
