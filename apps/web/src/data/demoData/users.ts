import { User } from '@/types'

const user1: User = {
    id: '1',
    firstName: 'דרורית',
    lastName: 'לטם ניצן',
    email: 'drorite13@gmail.com',
    roles: ['user'],
    academy: {
        startingDate: new Date('2021-01-01'),
        plan: 'pro',
        active: {
            expiredDate: new Date('2028-01-01'),
        },
        learningDiary: {
            tracks: [
                {
                    id: '1',
                    title: 'פסנתר כללי',
                    description: 'לימוד פסנתר כללי',
                    sections: [
                        {
                            id: '1',
                            title: 'מבוא לפסנתר',
                            description: 'למידת יסודות הנגינה בפסנתר',
                            tags: ['סולפז'],
                            startingDate: new Date('2021-01-01'),
                            completionDate: new Date('2021-01-01'),
                            lessons: [
                                {
                                    id: '1',
                                    mainSubjects: [
                                        'סולפז',
                                        'קורדים',
                                        'קטעים',
                                        'קטעים עם קורדים',
                                        'קטעים עם סולפז',
                                        'קטעים עם קורדים וסולפז',
                                    ],
                                    lessonStart: new Date('2021-01-01'),
                                    lessonEnd: new Date('2021-01-01'),
                                    improvments: [
                                        'קורדים',
                                        'קטעים',
                                        'קטעים עם קורדים',
                                        'קטעים עם סולפז',
                                        'קטעים עם קורדים וסולפז',
                                    ],
                                    goalsForNextLesson: [
                                        'קורדים',
                                        'קטעים',
                                        'קטעים עם קורדים',
                                        'קטעים עם סולפז',
                                        'קטעים עם קורדים וסולפז',
                                    ],
                                    lessonRecordingUrlPrivate:
                                        'https://www.youtube.com/embed/wraGEXJTYKQ',
                                    lessonRecordingUrlPublic:
                                        'https://www.youtube.com/embed/wraGEXJTYKQ',
                                    objectives: [
                                        {
                                            id: '1',
                                            title: 'סולפז',
                                            description: 'להבין ולשחק סולפז',
                                            tags: ['סולפז'],
                                            status: 'completed',
                                        },
                                    ],

                                    materials: ['1', '2', '3'],
                                    bonusMaterials: ['4', '5', '6'],
                                },
                            ],
                        },
                    ],
                    status: 'completed',
                    startingDate: new Date('2024-08-01'),
                    completionDate: new Date('2021-01-01'),
                    tags: ['פסנתר', 'פסנתר כללי'],
                },
            ],
        },
        modulesStatus: [
            {
                moduleId: '1',
                status: 'completed',
            },
            {
                moduleId: '2',
                status: 'completed',
            },
            {
                moduleId: '3',
                status: 'completed',
            },
        ],
        musicStudies: {
            musicPieces: [
                {
                    collection: 'lead-sheet-songs',

                    id: '1',
                    status: 'in-progress',
                },
            ],
        },
    },
    username: '',
    hashedPassword: '',
}

export const users = [user1]
