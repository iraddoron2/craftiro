import { CraftiroCourse } from '@/types/craftiroCourses'
import { buildHeaderIndex, cell } from './headers'
import { detectRowKind } from './kinds'
import {
    mapCourseRow,
    mapElementRow,
    mapLevelRow,
    mapScreenRow,
    mapStepRow,
    type CoursesContext,
} from './mappers'

const KEYS = [
    '_id',
    'systemId',
    'name',
    'seriesIds',
    'courseState',
    'authorIds',
    'betaDocLink',
    'betaDriveFolder',
    'thumbRelativePath',
    'shortDescription',
    'longDescription',
    'mainGoal',
    'mainSubjects',
    'difficulty',
    'age',
    'tags',
    'prerequisites',
    'price',
    'xp',
    'skillsComponentsXp',
    'createdAt',
    'updatedAt',
    'levelSystemId',
    'levelTitle',
    'levelSortDescription',
    'levelLongDescription',
    'stepSystemId',
    'stepTitle',
    'stepShortDescription',
    'stepLongDescription',
    'screenSystemId',
    'screenTitle',
    'screenType',
    'elementSystemId',
    'elementType',
    'elementContent',
] as const

export const runCoursesCsvPipeline = (
    parsedCsv: string[][]
): CraftiroCourse[] => {
    if (!parsedCsv || parsedCsv.length <= 1) return []
    const headersRow = parsedCsv[0]
    const I = buildHeaderIndex(headersRow, KEYS as unknown as string[])

    const ctx: CoursesContext = { courses: [] }

    for (let i = 1; i < parsedCsv.length; i++) {
        const row = parsedCsv[i]
        const lineNo = i + 1
        switch (detectRowKind(row, I, cell)) {
            case 'course':
                mapCourseRow(ctx, row, I)
                break
            case 'level':
                mapLevelRow(ctx, row, I, lineNo)
                break
            case 'step':
                mapStepRow(ctx, row, I, lineNo)
                break
            case 'screen':
                mapScreenRow(ctx, row, I, lineNo)
                break
            case 'element':
                mapElementRow(ctx, row, I, lineNo)
                break
            default:
                /* ignore */ break
        }
    }

    return ctx.courses
}
