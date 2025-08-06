import { CraftiroCourseScreen } from '@/types/craftiroCourses'

export type CraftiroCourseStep = {
    stepSystemId: string // unique identifier for the step
    stepTitle: string // title of the step
    stepShortDescription: string // brief description of the step
    stepLongDescription: string // detailed description of the step
    screens: CraftiroCourseScreen[] // list of screens in the step
}
