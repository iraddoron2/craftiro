import { ExerciseDifficulty } from '@/types'

export const getDifficultyLabel = (level: ExerciseDifficulty) => {
    const difficultyDict: { [key: string]: string } = {
        '1': 'מאוד קל',
        '2': 'קל',
        '3': 'בינוני',
        '4': 'קשה',
        '5': 'קשה מאוד',
    }

    const levelNumber = String(level)

    const label = difficultyDict[levelNumber]

    return label ? label : levelNumber
}
