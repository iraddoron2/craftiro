// src/context/CraftExercisesContext.tsx

import { CraftExercise } from '@/types/craftExercises'
import { createContext, useContext } from 'react'

export type CraftExercisesContextType = {
    exercises: CraftExercise[]
}

export const CraftExercisesContext = createContext<
    CraftExercisesContextType | undefined
>(undefined)

export const useCraftExercises = () => {
    const ctx = useContext(CraftExercisesContext)
    if (!ctx)
        throw new Error(
            'useCraftExercises must be used within CraftExercisesContext.Provider'
        )
    return ctx
}
