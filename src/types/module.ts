export type ModuleStatus = 'draft' | 'beta' | 'pilot' | 'published'

export type ModuleRating = 1 | 2 | 3 | 4 | 5

export type ReactionType =
    | 'like'
    | 'love'
    | 'curious'
    | 'confused'
    | 'insightful'

export type ModuleRequiredSubscription = 'free' | 'premium'

type ModuleMetadata = {
    generalInfo: {
        createdAt: Date
        updatedAt?: Date
        version: string // Format: '1.0.0'
        serialNumber: number // Unique identifier
        status: ModuleStatus
        authors: string[]
        contributors?: string[]
    }
    analyticsData: {
        views: number
        completions: number
        averageCompletionTime?: number
        rating?: ModuleRating
        feedbackCount?: number
        dropoffRate?: number
    }
    accessControl: {
        isPublic: boolean
        allowedUsers?: string[] // User ids
        requiredSubscription?: ModuleRequiredSubscription
        accessLogs?: {
            userId: string
            accessedAt: Date
        }[]
    }
    contentMetadata: {
        title: string
        categories: string[] // Categories
        tags: string[] // Keywords
        prerequisites?: string[] // Modules ids
        shortDescription: string // 160 characters
        longDescription: string // 500 characters
        objectives: string[] // Learning outcomes of the module (e.g. 'Understand the basics of React')
        subjects: string[]
        estimatedCompletionTime?: number // In seconds
        language: string // Hebrew, English, etc.
    }
    engagement: {
        likes: number // Number of users who liked the module
        favorites: number // Number of users who saved the module
        shares: number // Number of users who shared the module
        comments: {
            userId: string
            username: string
            timestamp: Date
            text: string
            likes?: number
            replies?: {
                userId: string
                username: string
                timestamp: Date
                text: string
                likes?: number
            }[]
        }[]
        discussions?: {
            topic: string
            participants: string[] // User ids
            messages: {
                sender: string
                timestamp: Date
                text: string
                attachments?: string[]
            }[]
        }[]
        reactions?: {
            userId: string
            type: ReactionType
            timestamp: Date
        }[]
        userProgressStats?: {
            totalEnrolled: number
            activeUsers: number
            averageCompletionTime?: number
            highestRatedUnit?: string // Unit id
        }
        leaderboard?: {
            userId: string
            username: string
            points: number // Points earned by the user
            completedModules: number // Number of modules completed by the user
            badges?: string[] // Badges ids
        }[]
    }
    evolution: {
        featureRequests?: string[]
        improvementSuggestions?: string[]
        bugReports?: {
            issue: string
            reportedBy: string // User id
            status: 'open' | 'in_progress' | 'resolved'
            createdAt: Date
        }[]
    }
}

export type Module = {
    _id: string
    metadata: ModuleMetadata
    units: Unit[]
}

type UnitMetaData = {
    generalInfo: {
        createdAt: Date
        updatedAt?: Date
        status: ModuleStatus
        authors: string[]
        contributors?: string[]
    }
    analyticsData: {
        views: number
        completions: number
        averageCompletionTime?: number
        rating?: ModuleRating
        feedbackCount?: number
        dropoffRate?: number
    }
    accessControl: {
        isPublic: boolean
        allowedUsers?: string[] // User ids
        requiredSubscription?: ModuleRequiredSubscription
        accessLogs?: {
            userId: string
            accessedAt: Date
        }[]
    }
    contentMetadata: {
        title: string
        categories: string[] // Categories
        tags: string[] // Keywords
        shortDescription: string // 160 characters
        longDescription: string // 500 characters
        objectives: string[] // Learning outcomes of the unit (e.g. 'Understand the basics of React')
        subjects: string[] // Subjects covered in the unit (e.g. 'React', 'Redux')
        estimatedCompletionTime?: number // In seconds
    }
    engagement: {
        likes: number // Number of users who liked the module
        favorites: number // Number of users who saved the module
        shares: number // Number of users who shared the module
        comments: {
            userId: string
            username: string
            timestamp: Date
            text: string
            likes?: number
            replies?: {
                userId: string
                username: string
                timestamp: Date
                text: string
                likes?: number
            }[]
        }[]
        discussions?: {
            topic: string
            participants: string[] // User ids
            messages: {
                sender: string
                timestamp: Date
                text: string
                attachments?: string[]
            }[]
        }[]
        reactions?: {
            userId: string
            type: ReactionType
            timestamp: Date
        }[]
        userProgressStats?: {
            totalEnrolled: number
            activeUsers: number
            averageCompletionTime?: number
        }
    }
    evolution: {
        featureRequests?: string[]
        improvementSuggestions?: string[]
        bugReports?: {
            issue: string
            reportedBy: string // User id
            status: 'open' | 'in_progress' | 'resolved'
            createdAt: Date
        }[]
    }
}

export type Unit = {
    _id: string
    metadata: UnitMetaData
    levels: Level[]
}

type LevelMetaData = {
    generalInfo: {
        createdAt: Date
        updatedAt?: Date
        status: ModuleStatus
        authors: string[]
        contributors?: string[]
    }
    analyticsData: {
        views: number
        completions: number
        averageCompletionTime?: number
        rating?: ModuleRating
        feedbackCount?: number
        dropoffRate?: number
    }
    accessControl: {
        isPublic: boolean
        allowedUsers?: string[] // User ids
        requiredSubscription?: ModuleRequiredSubscription
        accessLogs?: {
            userId: string
            accessedAt: Date
        }[]
    }
    contentMetadata: {
        title: string
        categories: string[] // Categories
        tags: string[] // Keywords
        shortDescription: string // 160 characters
        longDescription: string // 500 characters
        objectives: string[] // Learning outcomes of the unit (e.g. 'Understand the basics of React')
        subjects: string[] // Subjects covered in the unit (e.g. 'React', 'Redux')
        estimatedCompletionTime?: number // In seconds
    }
    engagement: {
        likes: number // Number of users who liked the module
        favorites: number // Number of users who saved the module
        shares: number // Number of users who shared the module
        comments: {
            userId: string
            username: string
            timestamp: Date
            text: string
            likes?: number
            replies?: {
                userId: string
                username: string
                timestamp: Date
                text: string
                likes?: number
            }[]
        }[]
        discussions?: {
            topic: string
            participants: string[] // User ids
            messages: {
                sender: string
                timestamp: Date
                text: string
                attachments?: string[]
            }[]
        }[]
        reactions?: {
            userId: string
            type: ReactionType
            timestamp: Date
        }[]
        userProgressStats?: {
            totalEnrolled: number
            activeUsers: number
            averageCompletionTime?: number
        }
    }
    evolution: {
        featureRequests?: string[]
        improvementSuggestions?: string[]
        bugReports?: {
            issue: string
            reportedBy: string // User id
            status: 'open' | 'in_progress' | 'resolved'
            createdAt: Date
        }[]
    }
}

export type Level = {
    _id: string
    metadata: LevelMetaData
    steps: Step[]
}

type StepMetaData = {
    generalInfo: {
        createdAt: Date
        updatedAt?: Date
        status: ModuleStatus
        authors: string[]
        contributors?: string[]
    }
    analyticsData: {
        views: number
        completions: number
        averageCompletionTime?: number
        rating?: ModuleRating
        feedbackCount?: number
        dropoffRate?: number
    }
    accessControl: {
        isPublic: boolean
        allowedUsers?: string[] // User ids
        requiredSubscription?: ModuleRequiredSubscription
        accessLogs?: {
            userId: string
            accessedAt: Date
        }[]
    }
    contentMetadata: {
        title: string
        shortDescription: string // 160 characters
        estimatedCompletionTime?: number // In seconds
    }
    engagement: {
        likes: number // Number of users who liked the module
        favorites: number // Number of users who saved the module
        shares: number // Number of users who shared the module
        comments: {
            userId: string
            username: string
            timestamp: Date
            text: string
            likes?: number
            replies?: {
                userId: string
                username: string
                timestamp: Date
                text: string
                likes?: number
            }[]
        }[]
        discussions?: {
            topic: string
            participants: string[] // User ids
            messages: {
                sender: string
                timestamp: Date
                text: string
                attachments?: string[]
            }[]
        }[]
        reactions?: {
            userId: string
            type: ReactionType
            timestamp: Date
        }[]
        userProgressStats?: {
            totalEnrolled: number
            activeUsers: number
            averageCompletionTime?: number
        }
    }
    evolution: {
        featureRequests?: string[]
        improvementSuggestions?: string[]
        bugReports?: {
            issue: string
            reportedBy: string // User id
            status: 'open' | 'in_progress' | 'resolved'
            createdAt: Date
        }[]
    }
}

export type Step = {
    _id: string
    metadata: StepMetaData
    content: LearningElement[]
    questions: Question[]
    exercises: Exercise[]
}

type LearningElementParagraph = {
    type: 'paragraph'
    content: string
}

type LearningElementImage = {
    type: 'image'
    src: string
    alt: string
}

export type LearningElement = LearningElementParagraph | LearningElementImage

export type MultipleChoiceQuestion = {
    questionType: 'multiple-choice'
    questionDescription: string // The question itself
    questionData: {
        options: {
            option: string
            isCorrect: boolean
        }[]
    }
}

export type OpenEndedQuestion = {
    questionType: 'open-ended'
    questionDescription: string // The question itself
    questionData: {
        correctAnswer: string
    }
}

export type QuestionData = MultipleChoiceQuestion | OpenEndedQuestion

export type Question = {
    _id: string
    questionType: 'multiple-choice' | 'open-ended'
    questionDescription: string // The question itself
    questionData: QuestionData
}

export type InstructionExercise = {
    exerciseType: 'instructions'
    description: string // The exercise itself
    instructions: string[] // List of instructions
}

export type ParagraphExercise = {
    exerciseType: 'paragraph'
    paragraphs: string[] // List of paragraphs that describe the exercise
}

export type ExerciseData = InstructionExercise | ParagraphExercise

export type Exercise = {
    _id: string
    exerciseType: 'instructions' | 'paragraph'
    exerciseData: ExerciseData
}
