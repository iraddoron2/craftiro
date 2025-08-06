import {
    CraftiroEssaySectionConclusion,
    CraftiroEssaySectionExercises,
    CraftiroEssaySectionInfographics,
    CraftiroEssaySectionIntro,
    CraftiroEssaySectionMain,
    CraftiroEssaySectionTerms,
    CraftiroEssaySectionTest,
} from '@/types/craftiroEssays'

export type CraftiroEssaySection =
    | CraftiroEssaySectionIntro
    | CraftiroEssaySectionMain
    | CraftiroEssaySectionConclusion
    | CraftiroEssaySectionTerms
    | CraftiroEssaySectionExercises
    | CraftiroEssaySectionInfographics
    | CraftiroEssaySectionTest
