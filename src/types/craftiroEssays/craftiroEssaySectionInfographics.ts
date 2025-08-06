import { CraftiroEssayBase } from '@/types/craftiroEssays'

export type CraftiroEssaySectionInfographics = CraftiroEssayBase & {
    type: 'infographics'
    craftiroInfographicIds: string[]
}
