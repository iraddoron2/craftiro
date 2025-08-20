import { CraftiroEssayBase } from '@/types/craftiroEssays'

export type CraftiroEssaySectionExercises = CraftiroEssayBase & {
    type: 'exercises'
    craftiroExerciseIds: string[]
}
