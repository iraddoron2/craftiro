import {
    CraftExercise,
    PianoScorePlayingExercise,
} from '@/types/craftExercises'

const exercise1: PianoScorePlayingExercise = {
    _id: '1',
    systemId: '1',
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
        instructions: [
            {
                id: '1',
                type: 'paragraph',
                content: [
                    {
                        id: '1',
                        text: 'הנחיות לתרגיל דו אמצעי',
                    },
                ],
            },
        ],
    },
    baseEvaluation: {
        feedback: {
            source: 'system',
            mediaType: 'text',
            content: [null],
        },
        scoreCheckType: 'system',
        xpScore: 10,
        skillsScore: 34,
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
const exercise42: PianoScorePlayingExercise = {
    _id: '42',
    systemId: '42',
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
const exercise43: PianoScorePlayingExercise = {
    _id: '43',
    systemId: '43',
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

export const exercises = [exercise1, exercise42, exercise43] as CraftExercise[]
