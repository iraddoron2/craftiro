import { CraftiroExercise } from '@/types/craftiroExercises'

export const getExerciseBySystemId = (
    exercise: CraftiroExercise[],
    systemId: string
): CraftiroExercise | undefined => {
    return exercise.find((ex) => ex.systemId === systemId)
}
