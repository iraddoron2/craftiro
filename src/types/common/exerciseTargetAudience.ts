export type ExerciseTargetAudience = {
    ageRange?: {
        min?: number // Minimum age (inclusive)
        max?: number // Maximum age (inclusive)
    }
    skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced' // e.g. 'Beginner'
    specificNeeds?: string[] // e.g. 'Students who learned D major scale', 'Piano beginners'
}
