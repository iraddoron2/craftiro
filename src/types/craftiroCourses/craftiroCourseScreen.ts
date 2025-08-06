import { CraftiroCourseScreenType } from '@/types/craftiroCourses'
import { CraftiroElement } from '@/types/craftiroElements'

export type CraftiroCourseScreen = {
    screenSystemId: string // unique identifier for the screen
    screenTitle: string // title of the screen
    screenType: CraftiroCourseScreenType // type of the screen (e.g., video, quiz, assignment)
    elements: CraftiroElement[] // list of elements in the screen
}
