// src/context/CraftiroExercisesContext.tsx

import { CraftiroExercise } from '@/types/craftiroExercises'
import { createContext, useContext } from 'react'

export type CraftiroExercisesContextType = {
    exercises: CraftiroExercise[]
}

export const CraftiroExercisesContext = createContext<
    CraftiroExercisesContextType | undefined
>(undefined)

export const useCraftiroExercises = () => {
    const ctx = useContext(CraftiroExercisesContext)
    if (!ctx)
        throw new Error(
            'useCraftiroExercises must be used within CraftiroExercisesContext.Provider'
        )
    return ctx
}
