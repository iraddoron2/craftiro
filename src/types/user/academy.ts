import {
    AcademyPlan,
    LearningDiary,
    ModuleStatus,
    MusicStudiesMusicPiece,
} from '@types'

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
