import { SkillComponent } from './skillComponent'

// A skill, e.g., "Root Accompaniment"
export type Skill = {
    skillId: string // Unique within the category
    name: string // Skill name
    components: SkillComponent[] // Array of components
}
