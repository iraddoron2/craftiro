import { CraftExercise } from '@/types/craftiroExercises'

export const getExerciseBySystemId = (
    exercise: CraftExercise[],
    systemId: string
): CraftExercise | undefined => {
    return exercise.find((ex) => ex.systemId === systemId)
}
