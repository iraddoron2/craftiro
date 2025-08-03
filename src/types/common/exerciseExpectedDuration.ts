export type ExerciseExpectedDuration = {
    lowerBound: {
        value: number
        unit: 'minutes' | 'hours'
    }
    upperBound?: {
        value: number
        unit: 'minutes' | 'hours'
    }
}
