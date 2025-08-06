import {
    SkillComponentMeasurement,
    SkillComponentSelfDifficulty,
} from '@/types/craftiroSkills'

export type UserSkillComponent = {
    skillComponentId: string // identifier for the skill component
    measurement: SkillComponentMeasurement // measurement data for the skill component
    selfDifficulty?: SkillComponentSelfDifficulty // self-assessment of difficulty
    lastPracticed: Date // last date the skill component was practiced
    instructorNotes?: string // optional evaluation from an instructor
}
