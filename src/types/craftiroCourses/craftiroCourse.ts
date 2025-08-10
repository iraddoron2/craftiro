import { CraftiroCourseLevel } from '@/types/craftiroCourses'

type ISODateString = string

export type CourseScore = {
    /** Total XP granted by completing the course */
    xp: number
    /** XP breakdown by skill component */
    skillsXp: {
        skillComponentId: string
        xp: number
    }[]
}

export type CraftiroCourse = {
    /** Unique identifier in persistence */
    _id: string
    /** Stable system identifier (slug-like) */
    systemId: string
    /** Public course name */
    name: string

    /** One or more series this course belongs to */
    seriesIds: string[]

    /** Current publication state */
    courseState: 'draft' | 'beta' | 'published'

    /** Optional documentation links */
    betaDocLink?: string
    betaDriveFolder?: string

    /** Relative path to thumbnail under assets API (e.g., "courses/<id>/thumb.png") */
    thumbRelativePath?: string | null

    /** Short public summary */
    shortDescription: string
    /** Full public description */
    longDescription: string

    /** Primary topics covered */
    mainSubjects: string[]
    /** Categorization tags */
    tags: string[]

    /** Pricing in your chosen currency units */
    price: number

    /** Prerequisites learners should have */
    prerequisites: string[]

    /** Main learning outcome */
    mainGoal: string

    /** Recommended minimum age */
    age: number

    /** Difficulty scale (1=beginner, 5=expert) */
    difficulty: 1 | 2 | 3 | 4 | 5

    /** Authors / instructors identifiers */
    authorIds: string[]

    /** Timestamps (ISO strings) */
    createdAt: ISODateString
    updatedAt: ISODateString

    /** XP breakdown */
    score: CourseScore

    /** Hierarchical levels within the course */
    levels: CraftiroCourseLevel[]
}
