import {
    ExerciseCategory,
    ExerciseDifficulty,
    ExerciseStyle,
    ExerciseTag,
    ExerciseTargetAudience,
    ExerciseType,
} from '@/types'
import { CraftExercise, ExerciseDiagramStyle } from '@/types/craftExercises'
import {
    getArrayFromStringSeperatedByComma,
    getDriveLinksArrayFromRowObject,
    getRowObject,
} from '../csv'

export const getCraftExerciseFromRowArray = (
    row: string[],
    csvText: string
): CraftExercise => {
    const rowObject = getRowObject(row, csvText)
    const craftExercise: CraftExercise = {
        _id: rowObject._id || '',
        systemId: rowObject._id || '',
        meta: {
            authorsIds: getArrayFromStringSeperatedByComma(
                rowObject.authors || ''
            ),
            createdAt: rowObject.createdAt || '',
            updatedAt: rowObject.updatedAt || '',
        },
        baseDetails: {
            exerciseType: (rowObject.exerciseType || null) as ExerciseType,
            name: rowObject.name || '',
            description: rowObject.description || '',
            difficulty: (Number(rowObject.difficulty) ||
                1) as ExerciseDifficulty,
            category: (rowObject.category || '') as ExerciseCategory,
            tags: getArrayFromStringSeperatedByComma(
                rowObject.tags || ''
            ) as ExerciseTag[],
            targetAudience: getArrayFromStringSeperatedByComma(
                rowObject.targetAudience || ''
            ) as ExerciseTargetAudience[],
            expectedDuration: {
                lowerBound: {
                    value:
                        Number(rowObject.expectedDurationLowerBoundValue) || 0,
                    unit: (rowObject.expectedDurationLowerBoundUnit ||
                        'minutes') as 'minutes' | 'hours',
                },
                upperBound: {
                    value:
                        Number(rowObject.expectedDurationUpperBoundValue) || 0,
                    unit: (rowObject.expectedDurationUpperBoundUnit ||
                        'minutes') as 'minutes' | 'hours',
                },
            },
            relatedExercisesIds: getArrayFromStringSeperatedByComma(
                rowObject.relatedExercises || ''
            ),
            relatedSkillsIds: getArrayFromStringSeperatedByComma(
                rowObject.relatedSkills || ''
            ),
            instructions: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'textSegment',
                            text: rowObject.instructions || '',
                            id: 'instructions-text',
                        },
                    ],
                    id: 'instructions',
                },
            ],
        },
        baseEvaluation: {
            feedback: null,
            scoreCheckType: null,
            xpScore: Number(rowObject.xpScore) || 0,
            skillsScore: Number(rowObject.skillsScore) || 0,
        },
        diagramStyle: (rowObject.diagramStyle ||
            'default') as ExerciseDiagramStyle,
        style: (rowObject.style || null) as ExerciseStyle,
        mainVersion: {
            _id: 'no id',
            meta: {
                authorsIds: null,
                createdAt: null,
                updatedAt: null,
                version: null,
            },
            details: {
                name: rowObject.name || null,
                description: rowObject.description || null,
            },
            assets: {
                driveChartsLinks: getDriveLinksArrayFromRowObject(rowObject),
                resources: null,
                solution: null,
                explanationVideo: null,
                abcNotation: null,
            },
        },
    }

    return craftExercise
}
