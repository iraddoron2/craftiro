import { Skill } from '@types'

// Category within a domain, e.g., "Piano Accompaniment"
export type SkillCategory = {
    categoryId: string // Unique within the domain
    name: string // Category name
    skills: Skill[] // Array of skills
}
