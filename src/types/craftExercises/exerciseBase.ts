import {
    CraftElement,
    ExerciseCategory,
    ExerciseDifficulty,
    ExerciseExpectedDuration,
    ExerciseFeedback,
    ExerciseScoreCheckType,
    ExerciseTag,
    ExerciseTargetAudience,
    ExerciseType,
} from '@types'

export type ExerciseBase = {
    _id: string // Unique identifier for the exercise
    systemId: string // System ID for internal use
    meta: {
        authorsIds?: string[] // Array of author IDs. Example: ['123', '456']
        createdAt?: string // Creation and last update timestamps (ISO string). Example: '2024-07-23T08:00:00Z'
        updatedAt?: string // Last update timestamp (ISO string). Example: '2024-07-23T08:00:00Z'
    }
    baseDetails: {
        exerciseType?: ExerciseType // Type of the exercise. Example: 'Piano Score Playing'
        name?: string // Name/title of the exercise. Example: 'Middle C Exercise'
        description?: string // Description of the exercise (what, why, general info). Example: 'Practice reading notes in C major.'
        difficulty?: ExerciseDifficulty // Difficulty level, from 1 (easiest) to 5 (hardest). Example: 2
        category?: ExerciseCategory // Category of the exercise. Example: 'Note Reading', 'Chords', 'Improvisation'
        tags?: ExerciseTag[] // Array of tags for searching/filtering. Example: ['beginner', 'piano', 'sight reading']
        targetAudience?: ExerciseTargetAudience[] // Who is this exercise intended for? Example: 'Beginners', 'Ages 8+', 'Students who learned D major scale'
        expectedDuration?: ExerciseExpectedDuration // Recommended duration with optional bounds (in minutes or hours). Example: { lowerBound: { value: 10, unit: 'minutes' }, upperBound: { value: 1, unit: 'hours' } }
        relatedExercisesIds?: string[] // Related exercise IDs. Example: ['42', '43']
        relatedSkillsIds?: string[] // Skills related to this exercise
        instructions?: CraftElement[] // Step-by-step instructions (separate from description). Example: 'Play each note aloud before moving on.'
    }
    baseEvaluation: {
        feedback?: ExerciseFeedback | null // Feedback type and content
        scoreCheckType?: ExerciseScoreCheckType | null // Scoring type: 'auto' (system checks), 'manual' (teacher), or 'none'. Example: 'auto'
        xpScore?: number // Optional, if you want to track XP points for completing the exercise
        skillsScore?: number // Optional, a score for skills related to this exercise. Split the score respectively between skills
    }
}
