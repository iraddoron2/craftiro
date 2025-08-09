import { CraftiroElement } from '@/types'
import {
    CraftiroCourse,
    CraftiroCourseLevel,
    CraftiroCourseScreen,
    CraftiroCourseScreenType,
    CraftiroCourseStep,
} from '@/types/craftiroCourses'

type CraftiroCourseCsvHeaders = {
    _id: string
    systemId: string
    name: string
    seriesId: string
    courseState: string
    authorsIds: string
    betaDocLink: string
    betaDriveFolder: string
    shortDescription: string
    longDescription: string
    mainGoal: string
    mainSubjects: string
    difficulty: string
    age: string
    tags: string
    prerequisites: string
    price: string
    xp: string
    skillsComponentsXp: string
    createdAt: string
    updatedAt: string
    levelSystemId: string
    levelTitle: string
    levelSortDescription: string
    levelLongDescription: string
    stepSystemId: string
    stepTitle: string
    stepShortDescription: string
    stepLongDescription: string
    screenSystemId: string
    screenTitle: string
    screenType: string
    elementSystemId: string
    elementType: CraftiroElement['type']
    elementContent: string
}

export const converParsedCoursesCsvToCoursesObject = (
    parsedCsv: string[][]
): CraftiroCourse[] | null => {
    if (!parsedCsv || parsedCsv.length === 0) {
        return null
    }

    const headers = parsedCsv[0]

    const headerIndexes = {} as Record<keyof CraftiroCourseCsvHeaders, number>
    headers.forEach((header, index) => {
        headerIndexes[header as keyof CraftiroCourseCsvHeaders] = index
    })

    const courses: CraftiroCourse[] = []

    // Helpers
    const convertStringToTrimmedArray = (value: string): string[] =>
        value
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item.length > 0)

    const getSkillsXpFromString = (
        text: string
    ): { skillComponentId: string; xp: number }[] => {
        return text
            .split('|')
            .map((item) => {
                const [skillComponentId, xp] = item.split(':')
                return {
                    skillComponentId: skillComponentId?.trim() || '',
                    xp: parseInt(xp?.trim() || '0'),
                }
            })
            .filter((item) => item.skillComponentId && item.xp > 0)
    }

    // Main loop
    for (let i = 1; i < parsedCsv.length; i++) {
        const row = parsedCsv[i]
        // detect type
        const isCourse = !!row[headerIndexes.systemId]
        const isLevel = !!row[headerIndexes.levelSystemId]
        const isStep = !!row[headerIndexes.stepSystemId]
        const isScreen = !!row[headerIndexes.screenSystemId]
        const isElement =
            !!row[headerIndexes.elementSystemId] ||
            (!isCourse && !isLevel && !isStep && !isScreen)

        if (isCourse) {
            const newCourse: CraftiroCourse = {
                _id: row[headerIndexes._id],
                systemId: row[headerIndexes.systemId],
                name: row[headerIndexes.name],
                seriesId: row[headerIndexes.seriesId],
                courseState: row[headerIndexes.courseState] as
                    | 'draft'
                    | 'beta'
                    | 'published',
                authorsIds: convertStringToTrimmedArray(
                    row[headerIndexes.authorsIds]
                ),
                betaDocLink: row[headerIndexes.betaDocLink],
                betaDriveFolder: row[headerIndexes.betaDriveFolder],
                shortDescription: row[headerIndexes.shortDescription],
                longDescription: row[headerIndexes.longDescription],
                mainGoal: row[headerIndexes.mainGoal],
                mainSubjects: convertStringToTrimmedArray(
                    row[headerIndexes.mainSubjects]
                ),
                difficulty: parseInt(row[headerIndexes.difficulty]) as
                    | 1
                    | 2
                    | 3
                    | 4
                    | 5,
                age: parseInt(row[headerIndexes.age]) || 0,
                tags: convertStringToTrimmedArray(row[headerIndexes.tags]),
                prerequisites: convertStringToTrimmedArray(
                    row[headerIndexes.prerequisites]
                ),
                price: parseFloat(row[headerIndexes.price]) || 0,
                score: {
                    xp: parseInt(row[headerIndexes.xp]) || 0,
                    skillsXp: getSkillsXpFromString(
                        row[headerIndexes.skillsComponentsXp] || ''
                    ),
                },
                createdAt: row[headerIndexes.createdAt],
                updatedAt: row[headerIndexes.updatedAt],
                levels: [],
            }
            courses.push(newCourse)
            continue
        }

        if (isLevel) {
            const lastCourse = courses.at(-1)
            if (!lastCourse) {
                console.warn(`Level at row ${i} has no parent course`)
                continue
            }
            const newLevel: CraftiroCourseLevel = {
                levelSystemId: row[headerIndexes.levelSystemId],
                levelTitle: row[headerIndexes.levelTitle],
                levelShortDescription: row[headerIndexes.levelSortDescription],
                levelLongDescription: row[headerIndexes.levelLongDescription],
                steps: [],
            }
            lastCourse.levels.push(newLevel)
            continue
        }

        if (isStep) {
            const lastCourse = courses.at(-1)
            const lastLevel = lastCourse?.levels.at(-1)
            if (!lastCourse || !lastLevel) {
                console.warn(`Step at row ${i} has no parent course/level`)
                continue
            }
            const newStep: CraftiroCourseStep = {
                stepSystemId: row[headerIndexes.stepSystemId],
                stepTitle: row[headerIndexes.stepTitle],
                stepShortDescription: row[headerIndexes.stepShortDescription],
                stepLongDescription: row[headerIndexes.stepLongDescription],
                screens: [],
            }
            lastLevel.steps.push(newStep)
            continue
        }

        if (isScreen) {
            const lastCourse = courses.at(-1)
            const lastLevel = lastCourse?.levels.at(-1)
            const lastStep = lastLevel?.steps.at(-1)
            if (!lastCourse || !lastLevel || !lastStep) {
                console.warn(
                    `Screen at row ${i} has no parent course/level/step`
                )
                continue
            }
            const newScreen: CraftiroCourseScreen = {
                screenSystemId: row[headerIndexes.screenSystemId],
                screenTitle: row[headerIndexes.screenTitle],
                screenType: row[
                    headerIndexes.screenType
                ] as CraftiroCourseScreenType,
                elements: [],
            }
            lastStep.screens.push(newScreen)
            continue
        }

        if (isElement) {
            const lastCourse = courses.at(-1)
            const lastLevel = lastCourse?.levels.at(-1)
            const lastStep = lastLevel?.steps.at(-1)
            const lastScreen = lastStep?.screens.at(-1)
            if (!lastCourse || !lastLevel || !lastStep || !lastScreen) {
                console.warn(
                    `Element at row ${i} has no parent course/level/step/screen`
                )
                continue
            }
            const newElement: CraftiroElement = {
                id: row[headerIndexes.elementSystemId],
                type: row[headerIndexes.elementType] as CraftiroElement['type'],
                // @ts-expect-error: element content type may vary and is handled dynamically
                content: row[headerIndexes.elementContent],
            }

            lastScreen.elements.push(newElement)
            continue
        }
    }

    return courses
}
