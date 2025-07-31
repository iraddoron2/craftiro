import {
    CraftExercise,
    PianoScorePlayingExercise,
} from '@/types/craftExercises'

const exercise1: PianoScorePlayingExercise = {
    _id: '1',
    meta: {
        authorsIds: ['1'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    baseDetails: {
        exerciseType: 'Piano Score Playing',
        name: 'תרגיל דו אמצעי',
        description: 'תרגיל נגינה של דו אמצעי בקצב פשוט',
        difficulty: 1,
        category: 'Sight Reading',
        tags: ['Beginner', 'Middle C'],
        targetAudience: [
            {
                ageRange: { min: 8, max: 12 },
                skillLevel: 'Beginner',
                specificNeeds: ['For those just starting with piano.'],
            },
        ],
        expectedDuration: {
            lowerBound: { value: 10, unit: 'minutes' },
            upperBound: { value: 1, unit: 'hours' },
        },
        relatedExercisesIds: ['42', '43'],
        relatedSkills: [],
        instructions: [],
    },
    baseEvaluation: {
        feedback: {
            source: 'system',
            mediaType: 'text',
            content: [null],
        },
        scoreCheckType: 'system',
        xpScore: 10,
        skillsScore: 10,
    },
    diagramStyle: 'Sheet Music',
    style: 'Instructor Accompaniment',
    mainVersion: {
        _id: '1',
        meta: {
            authorsIds: ['1'],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            version: 1,
        },
        details: {
            name: 'גרסה ראשית',
        },
        assets: {
            driveChartsLinks: [
                {
                    labels: ['Sheet Music', 'Lead Sheet'],
                    url: 'https://drive.google.com/file/d/1lS2-TsoMb44eg7EZUw74B05YNnAm-te4/view?usp=drive_link',
                },
            ],
        },
    },
}

export const exercises: CraftExercise[] = [exercise1]
