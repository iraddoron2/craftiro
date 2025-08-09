import { CraftiroCourseLevel } from '@/types/craftiroCourses'

export type CraftiroCourse = {
    _id: string // unique identifier for the course
    systemId: string // system identifier for the course
    name: string // name of the course
    seriesId: string // identifier for the series this course belongs to
    courseState: 'draft' | 'beta' | 'published' // state of the course
    betaDocLink?: string // link to the beta documentation
    betaDriveFolder?: string // link to the beta drive folder
    shortDescription: string // brief description of the course
    longDescription: string // detailed description of the course
    mainSubjects: string[] // main subjects covered in the course
    tags: string[] // tags for categorization (e.g., "music", "art")
    price: number // price of the course
    prerequisites: string[] // prerequisites for taking the course
    mainGoal: string // main goal of the course
    age: number // recommended age for the course
    difficulty: 1 | 2 | 3 | 4 | 5 // difficulty level of the course (1 is beginner, 5 is expert)
    authorsIds: string[] // list of author IDs associated with the course
    createdAt: string // ISO string for course creation date
    updatedAt: string // ISO string for course last update date
    score: {
        xp: number // total experience points for the course
        skillsXp: {
            skillComponentId: string // ID of the skill component
            xp: number // experience points for the skill component
        }[] // list of skill components with their experience points
    }
    levels: CraftiroCourseLevel[] // list of levels in the course
}
