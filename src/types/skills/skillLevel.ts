import {
    SkillLevelStatus,
    SkillMeasurementType,
    SkillMeasurementValue,
} from '@types'

// Skill level within a skill component
export type SkillLevel = {
    levelId: string // Unique within this component (e.g., 'level-1')
    name: string // Name/title of the level (e.g., 'Level 1 – All Fingers')
    status: SkillLevelStatus // Current status
    measurementType: SkillMeasurementType // How progress is measured
    value: SkillMeasurementValue // The current measured value (BPM, comment, true/false, etc)
    notes?: string // Free text notes, comments, observations
}
