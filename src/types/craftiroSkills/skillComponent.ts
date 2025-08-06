import {
    SkillCategory,
    SkillDomain,
    SkillMeasurementType,
} from '@/types/craftiroSkills'

export type SkillComponent = {
    systemId: string // identifier for the skill component
    skillDomain: SkillDomain // domain of the skill (e.g., Music)
    skillCategory: SkillCategory // category of the skill (e.g., Piano Accompaniment)
    skillComponentName: string // name of the skill component
    skillComponentLevel: number // level of the skill component
    skillComponentDescription: string // description of the skill component
    measurementType: SkillMeasurementType // how the skill is measured (e.g., tempo, instructor evaluation)
    successValue: number | null
}
