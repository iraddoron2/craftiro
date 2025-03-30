import { Level } from './level'

export type UserRole = 'admin' | 'guest' | 'user'

export type AcademyPlan = 'free' | 'basic' | 'advanced' | 'pro'

export type Chapter = {
    id: string
    title: string
    intro: string
    levels: Level[]
}

export type Unit = {
    id: string
    chapters: Chapter[]
}

export type Module = {
    id: string
    title: string
    introParagraph: string
    moduleQuestions: string[] // Questions that will be answered in the module
    prerequisitesModules: string[] // Modules ids
    tags: string[]
    editors: string[]
    contentCreators: string[]
    version: string // Format: '1.0.0'
    learningUnits: Unit[]
}

export type TaskStatus = 'not-started' | 'in-progress' | 'completed'

export type LessonObjective = {
    id: string
    title: string
    description: string
    tags: string[]
    status: TaskStatus
}

export type TrackSectionLesson = {
    id: string
    mainSubjects: string[]
    lessonStart: Date
    lessonEnd: Date
    improvments: string[]
    goalsForNextLesson: string[]
    lessonRecordingUrlPrivate: string
    lessonRecordingUrlPublic: string
    objectives: LessonObjective[]
    materials: string[] // Modules ids
    bonusMaterials: string[] // Modules ids
}

export type TrackSection = {
    id: string
    title: string
    description: string
    tags: string[]
    startingDate: Date
    completionDate: Date
    lessons: TrackSectionLesson[]
}

export type Track = {
    _id: string
    title: string
    description: string
    sections: TrackSection[]
    status: TaskStatus
    startingDate: Date
    completionDate: Date
    tags: string[]
}

export type LearningDiary = {
    tracks: Track[]
}

export type ModuleStatus = {
    moduleId: string
    status: 'completed' | 'not-started' | 'in-progress' | 'locked' | 'wish-list'
}

export type MusicStudiesMusicPiece = {
    collection:
        | 'lead-sheet-songs'
        | 'lead-sheet-pieces'
        | 'lead-sheet-cinema-pieces'
    id: string
    status: 'whish-list' | 'in-progress' | 'completed' | 'not-started'
}

export type Academy = {
    startingDate: Date | null
    plan: AcademyPlan
    active: {
        expiredDate: Date | null
    }
    learningDiary: LearningDiary
    modulesStatus: ModuleStatus[]
    musicStudies: {
        musicPieces: MusicStudiesMusicPiece[]
    }
}

export type User = {
    _id: string
    firstName: string
    lastName: string
    username: string
    email: string
    hashedPassword: string
    roles: UserRole[]
    academy: Academy
}

export type TabsNavbarProps = {
    linksGroups: {
        href: string
        label: string
    }[][]
    currentPath: string
}

export type TabLink = {
    path: string
    label: string
}

export type LinkGroup = TabLink[]

export type CurrentPath = string

export type LinksGroups = LinkGroup[]
