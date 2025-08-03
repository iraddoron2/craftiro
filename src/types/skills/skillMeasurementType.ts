// How progress is measured for this skill/level
export type SkillMeasurementType =
    | 'tempo' // BPM, metronome, speed
    | 'instructor' // Teacher evaluation
    | 'test' // Quiz/exam
    | 'custom' // Any other method (explain in notes)
