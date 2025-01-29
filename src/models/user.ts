import mongoose, { Schema, models } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        enum: ['user', 'admin', 'student', 'teacher'],
        default: ['user'],
    },
    academy: {
        startingDate: {
            type: Date,
            default: new Date(),
        },
        plan: {
            type: String,
            enum: ['free', 'basic', 'advanced', 'pro'],
            default: 'free',
        },
        active: {
            expiredDate: {
                type: Date,
                default: new Date(),
            },
        },
        learningDiary: {
            tracks: [
                {
                    id: String,
                    title: String,
                    description: String,
                    sections: [
                        {
                            id: String,
                            title: String,
                            description: String,
                            tags: [String],
                            startingDate: Date,
                            completionDate: Date,
                            lessons: [
                                {
                                    id: String,
                                    mainSubjects: [String],
                                    lessonStart: Date,
                                    lessonEnd: Date,
                                    improvments: [String],
                                    goalsForNextLesson: [String],
                                    lessonRecordingUrlPrivate: String,
                                    lessonRecordingUrlPublic: String,
                                    objectives: [
                                        {
                                            id: String,
                                            title: String,
                                            description: String,
                                            tags: [String],
                                            status: {
                                                type: String,
                                                enum: [
                                                    'completed',
                                                    'not-started',
                                                    'in-progress',
                                                ],
                                                default: 'not-started',
                                            },
                                        },
                                    ],
                                    materials: [String],
                                    bonusMaterials: [String],
                                },
                            ],
                        },
                    ],
                    status: {
                        type: String,
                        enum: ['completed', 'not-started', 'in-progress'],
                        default: 'not-started',
                    },
                    startingDate: Date,
                    completionDate: Date,
                    tags: [String],
                },
            ],
        },
        modulesStatus: {
            type: [
                {
                    moduleId: String,
                    status: {
                        type: String,
                        enum: [
                            'completed',
                            'not-started',
                            'in-progress',
                            'locked',
                            'wish-list',
                        ],
                        default: 'not-started',
                    },
                },
            ],
        },
        musicStudies: {
            musicPieces: {
                type: [
                    {
                        collection: {
                            type: String,
                            enum: [
                                'lead-sheet-songs',
                                'lead-sheet-pieces',
                                'lead-sheet-cinema-pieces',
                            ],
                            default: 'lead-sheet-songs',
                        },
                        id: String,
                        status: {
                            type: String,
                            enum: [
                                'whish-list',
                                'in-progress',
                                'completed',
                                'not-started',
                            ],
                            default: 'not-started',
                        },
                    },
                ],
            },
        },
        default: {},
    },
})

// const User = mongoose.model('User', userSchema)

const User = models?.User || mongoose.model('User', userSchema)

export default User
