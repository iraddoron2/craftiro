// Status of the skill at a given level
export type SkillLevelStatus =
    | 'pending' // Waiting, not started yet
    | 'understood' // Understood in theory
    | 'practice' // Practicing
    | 'maintenance' // Maintaining skill
    | 'mastered' // Fully established/mastered
