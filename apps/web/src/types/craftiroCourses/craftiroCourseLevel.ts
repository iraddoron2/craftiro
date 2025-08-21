import { CraftiroCourseStep } from '@/types/craftiroCourses'

export type CraftiroCourseLevel = {
    levelSystemId: string // unique identifier for the level
    levelTitle: string // title of the level
    levelShortDescription: string // brief description of the level
    levelLongDescription: string // detailed description of the level
    steps: CraftiroCourseStep[] // list of steps
}
