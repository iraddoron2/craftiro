import { CraftiroElement } from '@/types'
import {
    CraftiroCourse,
    CraftiroCourseLevel,
    CraftiroCourseScreen,
    CraftiroCourseScreenType,
    CraftiroCourseStep,
} from '@/types/craftiroCourses'

// Strong header shape (as declared in your CSV)
type CraftiroCourseCsvHeaders = {
    _id: string
    systemId: string
    name: string
    seriesIds: string // comma-separated list
    courseState: string
    authorIds: string // comma-separated list
    betaDocLink: string
    betaDriveFolder: string
    thumbRelativePath: string
    shortDescription: string
    longDescription: string
    mainGoal: string
    mainSubjects: string // comma-separated list
    difficulty: string
    age: string
    tags: string // comma-separated list
    prerequisites: string // comma-separated list
    price: string
    xp: string
    skillsComponentsXp: string // "skillA:10|skillB:5"
    createdAt: string
    updatedAt: string

    // Level
    levelSystemId: string
    levelTitle: string
    levelSortDescription: string // CSV may use 'levelShortDescription'
    levelLongDescription: string

    // Step
    stepSystemId: string
    stepTitle: string
    stepShortDescription: string
    stepLongDescription: string

    // Screen
    screenSystemId: string
    screenTitle: string
    screenType: string

    // Element
    elementSystemId: string
    elementType: CraftiroElement['type']
    elementContent: string
}

const toReqString = (v: string) => v?.trim() ?? ''
const toOptString = (v: string) => {
    const t = v?.trim()
    return t ? t : undefined
}

export const convertParsedCoursesCsvToCourses = (
    parsedCsv: string[][]
): CraftiroCourse[] => {
    // Guard: empty CSV or only headers
    if (!parsedCsv || parsedCsv.length <= 1) return []

    const headers = parsedCsv[0].map((h) => (h || '').trim())

    // --- Helpers --------------------------------------------------------------

    // Safe header index lookup with support for aliases
    const idx = (
        key: keyof CraftiroCourseCsvHeaders,
        aliases: string[] = []
    ) => {
        const options = [key as string, ...aliases]
        for (const k of options) {
            const i = headers.findIndex((h) => h === k)
            if (i !== -1) return i
        }
        return -1
    }

    // Read + trim a cell by index
    const cell = (row: string[], i: number, fallback = '') =>
        (i >= 0 ? row[i] ?? '' : fallback).toString().trim()

    // Split comma-separated lists into trimmed array
    const toList = (value: string) =>
        value
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)

    // Parse int/float with defaults
    const toInt = (v: string, def = 0) => {
        const n = parseInt(v, 10)
        return Number.isFinite(n) ? n : def
    }
    const toFloat = (v: string, def = 0) => {
        const n = parseFloat(v)
        return Number.isFinite(n) ? n : def
    }

    // Parse skills xp "skillId:10|skill2:5"
    const parseSkillsXp = (text: string) =>
        text
            .split('|')
            .map((pair) => {
                const [skillComponentId, xpRaw] = pair.split(':')
                return {
                    skillComponentId: (skillComponentId || '').trim(),
                    xp: toInt((xpRaw || '').trim(), 0),
                }
            })
            .filter((x) => x.skillComponentId && x.xp > 0)

    // Clamp difficulty 1..5
    const clampDifficulty = (n: number): 1 | 2 | 3 | 4 | 5 => {
        const c = Math.min(5, Math.max(1, n || 1))
        return c as 1 | 2 | 3 | 4 | 5
    }

    // Precompute all indices (with alias support where needed)
    const I = {
        _id: idx('_id'),
        systemId: idx('systemId'),
        name: idx('name'),
        seriesIds: idx('seriesIds'),
        courseState: idx('courseState'),
        authorIds: idx('authorIds'),
        betaDocLink: idx('betaDocLink'),
        betaDriveFolder: idx('betaDriveFolder'),
        thumbRelativePath: idx('thumbRelativePath'),

        shortDescription: idx('shortDescription'),
        longDescription: idx('longDescription'),
        mainGoal: idx('mainGoal'),
        mainSubjects: idx('mainSubjects'),
        difficulty: idx('difficulty'),
        age: idx('age'),
        tags: idx('tags'),
        prerequisites: idx('prerequisites'),
        price: idx('price'),
        xp: idx('xp'),
        skillsComponentsXp: idx('skillsComponentsXp'),
        createdAt: idx('createdAt'),
        updatedAt: idx('updatedAt'),

        levelSystemId: idx('levelSystemId'),
        levelTitle: idx('levelTitle'),
        levelSortDescription: idx('levelSortDescription', [
            'levelShortDescription',
        ]),
        levelLongDescription: idx('levelLongDescription'),

        stepSystemId: idx('stepSystemId'),
        stepTitle: idx('stepTitle'),
        stepShortDescription: idx('stepShortDescription'),
        stepLongDescription: idx('stepLongDescription'),

        screenSystemId: idx('screenSystemId'),
        screenTitle: idx('screenTitle'),
        screenType: idx('screenType'),

        elementSystemId: idx('elementSystemId'),
        elementType: idx('elementType'),
        elementContent: idx('elementContent'),
    }

    const courses: CraftiroCourse[] = []

    // --- Main loop ------------------------------------------------------------
    for (let i = 1; i < parsedCsv.length; i++) {
        const row = parsedCsv[i]
        const lineNo = i + 1 // for human-friendly warnings (includes header row)

        const has = (index: number) => index >= 0 && !!cell(row, index)

        // Detect row kind by presence of identifying fields
        const isCourse = has(I.systemId)
        const isLevel = has(I.levelSystemId)
        const isStep = has(I.stepSystemId)
        const isScreen = has(I.screenSystemId)
        const isElement =
            has(I.elementSystemId) ||
            (!isCourse && !isLevel && !isStep && !isScreen)

        if (isCourse) {
            const newCourse: CraftiroCourse = {
                _id: cell(row, I._id),
                systemId: cell(row, I.systemId),
                name: cell(row, I.name),

                // NEW: arrays
                seriesIds: toList(cell(row, I.seriesIds)),
                authorIds: toList(cell(row, I.authorIds)),

                courseState:
                    (cell(row, I.courseState) as
                        | 'draft'
                        | 'beta'
                        | 'published') || 'draft',

                betaDocLink: cell(row, I.betaDocLink),
                betaDriveFolder: cell(row, I.betaDriveFolder),

                // Optional thumb
                thumbRelativePath: toOptString(cell(row, I.thumbRelativePath)),

                // Required strings normalized
                shortDescription: toReqString(cell(row, I.shortDescription)),
                longDescription: toReqString(cell(row, I.longDescription)),
                mainGoal: toReqString(cell(row, I.mainGoal)),

                // Lists and numbers
                mainSubjects: toList(cell(row, I.mainSubjects)),
                tags: toList(cell(row, I.tags)),
                price: toFloat(cell(row, I.price), 0),
                prerequisites: toList(cell(row, I.prerequisites)),
                age: toInt(cell(row, I.age), 0),
                difficulty: clampDifficulty(toInt(cell(row, I.difficulty), 1)),

                // Score
                score: {
                    xp: toInt(cell(row, I.xp), 0),
                    skillsXp: parseSkillsXp(cell(row, I.skillsComponentsXp)),
                },

                // Timestamps
                createdAt: cell(row, I.createdAt),
                updatedAt: cell(row, I.updatedAt),

                // Children
                levels: [],
            }

            courses.push(newCourse)
            continue
        }

        if (isLevel) {
            const lastCourse = courses.at(-1)
            if (!lastCourse) {
                console.warn(
                    `[CSV] Level at line ${lineNo} has no parent course`
                )
                continue
            }
            const newLevel: CraftiroCourseLevel = {
                levelSystemId: cell(row, I.levelSystemId),
                levelTitle: cell(row, I.levelTitle),
                levelShortDescription: cell(row, I.levelSortDescription), // supports 'sort/short'
                levelLongDescription: cell(row, I.levelLongDescription),
                steps: [],
            }
            lastCourse.levels.push(newLevel)
            continue
        }

        if (isStep) {
            const lastCourse = courses.at(-1)
            const lastLevel = lastCourse?.levels.at(-1)
            if (!lastCourse || !lastLevel) {
                console.warn(
                    `[CSV] Step at line ${lineNo} has no parent course/level`
                )
                continue
            }
            const newStep: CraftiroCourseStep = {
                stepSystemId: cell(row, I.stepSystemId),
                stepTitle: cell(row, I.stepTitle),
                stepShortDescription: cell(row, I.stepShortDescription),
                stepLongDescription: cell(row, I.stepLongDescription),
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
                    `[CSV] Screen at line ${lineNo} has no parent course/level/step`
                )
                continue
            }
            const newScreen: CraftiroCourseScreen = {
                screenSystemId: cell(row, I.screenSystemId),
                screenTitle: cell(row, I.screenTitle),
                screenType: cell(row, I.screenType) as CraftiroCourseScreenType,
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
                    `[CSV] Element at line ${lineNo} has no parent course/level/step/screen`
                )
                continue
            }
            const newElement: CraftiroElement = {
                id: cell(row, I.elementSystemId),
                type: cell(row, I.elementType) as CraftiroElement['type'],
                // NOTE: element content may vary per type; keep raw string and parse in renderer
                // @ts-expect-error dynamic content type by element.type
                content: cell(row, I.elementContent),
            }
            lastScreen.elements.push(newElement)
            continue
        }

        // Unrecognized row – ignore quietly
    }

    return courses
}
