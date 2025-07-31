// The current value – depends on measurement type
export type SkillMeasurementValue =
    | number // For tempo/test results
    | string // For instructor notes, qualitative
    | boolean // For simple pass/fail
    | null // Not measured yet
