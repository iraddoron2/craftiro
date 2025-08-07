import { CraftiroCourse } from '@/types/craftiroCourses'
import { createContext, useContext } from 'react'

export type CraftiroCoursesContextType = {
    courses: CraftiroCourse[]
}

export const CraftiroCoursesContext = createContext<
    CraftiroCoursesContextType | undefined
>(undefined)

export const useCraftiroCourses = () => {
    const ctx = useContext(CraftiroCoursesContext)
    if (!ctx)
        throw new Error(
            'useCraftiroCourses must be used within CraftiroCoursesContext.Provider'
        )
    return ctx
}
