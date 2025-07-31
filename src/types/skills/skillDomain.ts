import { SkillCategory } from '@types'

// Domain, e.g., "Music"
export type SkillDomain = {
    domainId: string // Unique identifier (e.g., 'music')
    name: string // Domain name (e.g., 'Music')
    categories: SkillCategory[] // Array of categories
}
