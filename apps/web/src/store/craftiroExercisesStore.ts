import { CraftiroExercise } from '@/types/craftiroExercises'
import { create } from 'zustand'

type CraftiroExercisesState = {
    craftiroExercises: CraftiroExercise[]
    craftiroExercisesLoading: boolean
    craftiroExercisesError: string | null
    setCraftiroExercises: (ex: CraftiroExercise[]) => void
    setCraftiroExercisesLoading: (b: boolean) => void
    setCraftiroExercisesError: (e: string | null) => void
}

export const useCraftiroExercisesStore = create<CraftiroExercisesState>(
    (set) => ({
        // Initial state
        craftiroExercises: [],
        craftiroExercisesLoading: false,
        craftiroExercisesError: null,

        // Actions
        setCraftiroExercises: (ex) => set({ craftiroExercises: ex }),
        setCraftiroExercisesLoading: (b) =>
            set({ craftiroExercisesLoading: b }),
        setCraftiroExercisesError: (e) => set({ craftiroExercisesError: e }),
    })
)
