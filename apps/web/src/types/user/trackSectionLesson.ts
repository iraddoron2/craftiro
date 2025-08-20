import { LessonObjective } from '@/types'

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
