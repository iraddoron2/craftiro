import { SkillCategory, SkillDomain } from '@/types/craftiroSkills'

export type Skill = {
    _id: string // unique identifier for the skill
    systemId: string // system identifier for the skill
    name: string // name of the skill
    domain: SkillDomain // domain of the skill (e.g., Music)
    category: SkillCategory // category of the skill (e.g., Piano Accompaniment)
    description?: string // optional description of the skill
}
