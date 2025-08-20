import { CraftiroEssaySection } from '@/types/craftiroEssays'

export type CraftiroEssay = {
    _id: string
    systemId: string
    domain: string
    category: string
    title: string
    shortDescription: string
    longDescription: string
    prerequisites: string[]
    mainGoal: string
    mainSubjects: string[]
    gainedSkills: string[]
    tags: string[]
    accessibility: 'free' | 'pro'
    age?: number
    price?: number
    difficulty?: 1 | 2 | 3 | 4 | 5 // 1 is beginner, 5 is expert
    authorIds?: string[]
    createdAt: string // ISO string
    updatedAt: string // ISO string
    sections: CraftiroEssaySection[]
    score?: {
        xp: number
        skillsXp: {
            skillComponentId: string
            xp: number
        }[]
    }
}
