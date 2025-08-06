import { CraftiroElement } from '../craftiroElements'
import { CraftiroEssayBase } from './craftiroEssayBase'

export type CraftiroEssaySectionConclusion = CraftiroEssayBase & {
    type: 'conclusion'
    content: CraftiroElement[]
}
