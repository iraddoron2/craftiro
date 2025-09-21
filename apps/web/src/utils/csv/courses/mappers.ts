// Small mappers per entity – mutate context safely
import type { CraftiroElement } from '@/types'
import {
    CraftiroCourse,
    CraftiroCourseLevel,
    CraftiroCourseScreen,
    CraftiroCourseScreenType,
    CraftiroCourseStep,
} from '@/types/craftiroCourses'
import { cell } from './headers'
import {
    clampDifficulty,
    parseSkillsXp,
    toFloat,
    toInt,
    toList,
    toOptString,
    toReqString,
} from './helpers'

export type CoursesContext = {
    courses: CraftiroCourse[]
    lastCourse?: CraftiroCourse
    lastLevel?: CraftiroCourseLevel
    lastStep?: CraftiroCourseStep
}

const coerceElementType = (raw: string): CraftiroElement['type'] =>
    raw as unknown as CraftiroElement['type']

export const mapCourseRow = (
    ctx: CoursesContext,
    row: string[],
    I: Record<string, number>
) => {
    const newCourse: CraftiroCourse = {
        _id: cell(row, I._id!),
        systemId: cell(row, I.systemId!),
        name: cell(row, I.name!),
        seriesIds: toList(cell(row, I.seriesIds!)),
        courseState:
            (cell(row, I.courseState!) as 'draft' | 'beta' | 'published') ||
            'draft',
        betaDocLink: cell(row, I.betaDocLink!),
        betaDriveFolder: cell(row, I.betaDriveFolder!),
        thumbRelativePath: toOptString(cell(row, I.thumbRelativePath!)),
        shortDescription: toReqString(cell(row, I.shortDescription!)),
        longDescription: toReqString(cell(row, I.longDescription!)),
        mainGoal: toReqString(cell(row, I.mainGoal!)),
        mainSubjects: toList(cell(row, I.mainSubjects!)),
        tags: toList(cell(row, I.tags!)),
        price: toFloat(cell(row, I.price!), 0),
        prerequisites: toList(cell(row, I.prerequisites!)),
        age: toInt(cell(row, I.age!), 0),
        difficulty: clampDifficulty(toInt(cell(row, I.difficulty!), 1)),
        authorIds: toList(cell(row, I.authorIds!)),
        createdAt: cell(row, I.createdAt!),
        updatedAt: cell(row, I.updatedAt!),
        score: {
            xp: toInt(cell(row, I.xp!), 0),
            skillsXp: parseSkillsXp(cell(row, I.skillsComponentsXp!)),
        },
        levels: [],
    }
    ctx.courses.push(newCourse)
    ctx.lastCourse = newCourse
    ctx.lastLevel = undefined
    ctx.lastStep = undefined
}

export const mapLevelRow = (
    ctx: CoursesContext,
    row: string[],
    I: Record<string, number>,
    lineNo: number
) => {
    const parent = ctx.lastCourse
    if (!parent) {
        console.warn(`[CSV] Level at line ${lineNo} has no parent course`)
        return
    }
    const newLevel: CraftiroCourseLevel = {
        levelSystemId: cell(row, I.levelSystemId!),
        levelTitle: cell(row, I.levelTitle!),
        levelShortDescription: cell(row, I.levelSortDescription!),
        levelLongDescription: cell(row, I.levelLongDescription!),
        steps: [],
    }
    parent.levels.push(newLevel)
    ctx.lastLevel = newLevel
    ctx.lastStep = undefined
}

export const mapStepRow = (
    ctx: CoursesContext,
    row: string[],
    I: Record<string, number>,
    lineNo: number
) => {
    const parent = ctx.lastLevel
    if (!parent || !ctx.lastCourse) {
        console.warn(`[CSV] Step at line ${lineNo} has no parent course/level`)
        return
    }
    const newStep: CraftiroCourseStep = {
        stepSystemId: cell(row, I.stepSystemId!),
        stepTitle: cell(row, I.stepTitle!),
        stepShortDescription: cell(row, I.stepShortDescription!),
        stepLongDescription: cell(row, I.stepLongDescription!),
        screens: [],
    }
    parent.steps.push(newStep)
    ctx.lastStep = newStep
}

export const mapScreenRow = (
    ctx: CoursesContext,
    row: string[],
    I: Record<string, number>,
    lineNo: number
) => {
    const parent = ctx.lastStep
    if (!parent || !ctx.lastLevel || !ctx.lastCourse) {
        console.warn(
            `[CSV] Screen at line ${lineNo} has no parent course/level/step`
        )
        return
    }
    const newScreen: CraftiroCourseScreen = {
        screenSystemId: cell(row, I.screenSystemId!),
        screenTitle: cell(row, I.screenTitle!),
        screenType: cell(row, I.screenType!) as CraftiroCourseScreenType,
        learningTimeInSeconds: toInt(cell(row, I.learningTimeInSeconds!), 0),
        elements: [],
    }
    parent.screens.push(newScreen)
}

export const mapElementRow = (
    ctx: CoursesContext,
    row: string[],
    I: Record<string, number>,
    lineNo: number
) => {
    const parent = ctx.lastStep?.screens.at(-1)
    if (!parent || !ctx.lastStep || !ctx.lastLevel || !ctx.lastCourse) {
        console.warn(
            `[CSV] Element at line ${lineNo} has no parent course/level/step/screen`
        )
        return
    }

    const elementType = coerceElementType(cell(row, I.elementType!))
    const elementId = cell(row, I.elementSystemId!)
    const elementContent = cell(row, I.elementContent!)

    let element: CraftiroElement

    if (elementType === 'youtubeVideo') {
        element = {
            id: elementId,
            type: 'youtubeVideo',
            content: elementContent,
            systemId: '',
        }
    } else if (elementType === 'paragraph') {
        element = {
            id: elementId,
            type: 'paragraph',
            content: [
                {
                    id: elementId,
                    systemId: '',
                    type: 'textSegment',
                    content: elementContent,
                },
            ],
            systemId: '',
        }
    } else if (elementType === 'textSegment') {
        element = {
            id: elementId,
            type: 'textSegment',
            content: elementContent,
            systemId: '',
        }
    } else {
        // fallback for unknown types
        element = {
            id: elementId,
            type: elementType,
            content: elementContent,
            systemId: '',
        } as CraftiroElement
    }

    parent.elements.push(element)
}
