import { CraftiroElement } from '@/types/craftiroElements'
import { CraftiroEssayBase } from '@/types/craftiroEssays'

export type CraftiroEssaySectionTerms = CraftiroEssayBase & {
    type: 'terms'
    content: CraftiroElement[]
}
