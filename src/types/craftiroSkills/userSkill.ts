import {
    SkillComponentSelfDifficulty,
    SkillStatus,
} from '@/types/craftiroSkills'

export type UserSkill = {
    skillId: string // unique identifier for the skill
    mastery: {
        status: SkillStatus // current status of the skill
        lastPracticed: Date // last date the skill was practiced
        selfDifficulty?: SkillComponentSelfDifficulty // optional self-assessment of difficulty
        instructorNotes?: string // optional notes from an instructor
    }
}
