import { themes } from '@/styles/themes'

export type UserRole = 'admin' | 'guest' | 'user'

export type AcademyPlan = 'free' | 'basic' | 'advanced' | 'pro'

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
    id: string
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
    id: string
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

export type ColorScale =
    | 10
    | 20
    | 30
    | 40
    | 50
    | 60
    | 70
    | 80
    | 90
    | 100
    | 110
    | 120
    | 130
    | 140
    | 150
    | 160
    | 170
    | 180
    | 190

export type ColorAliases = {
    main: string
    dark: string
    darkest: string
    light: string
    lightest: string
}

export type ColorPalette = Record<ColorScale, string> & ColorAliases

export type Theme = {
    backgrounds: {
        page: string
        topNavbar: string
        sideNavbar: string
    }
    text: {
        onPageBackground: string
    }
}

export type ThemeName = keyof typeof themes
