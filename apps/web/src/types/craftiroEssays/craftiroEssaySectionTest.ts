import { CraftiroEssayBase, CraftiroEssayTest } from '@/types/craftiroEssays'

export type CraftiroEssaySectionTest = CraftiroEssayBase & {
    type: 'test'
    test: CraftiroEssayTest
}
