import { CraftiroElement } from '@/types/craftiroElements'
import { CraftiroEssaySectionType } from '@/types/craftiroEssays'

export type CraftiroEssayBase = {
    id: string
    type: CraftiroEssaySectionType
    title: string
    content?: CraftiroElement[]
}
