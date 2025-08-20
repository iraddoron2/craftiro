import { CraftiroElement } from '@/types/craftiroElements'
import { CraftiroEssayBase } from '@/types/craftiroEssays'

export type CraftiroEssaySectionIntro = CraftiroEssayBase & {
    type: 'intro'
    content: CraftiroElement[]
}
