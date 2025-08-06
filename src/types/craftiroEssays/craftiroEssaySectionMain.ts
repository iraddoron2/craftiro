import { CraftiroElement } from '@/types/craftiroElements'
import { CraftiroEssayBase } from '@/types/craftiroEssays'

export type CraftiroEssaySectionMain = CraftiroEssayBase & {
    type: 'main'
    content: CraftiroElement[]
    craftiroExerciseIds?: string[]
    craftiroInfographicIds?: string[]
}
