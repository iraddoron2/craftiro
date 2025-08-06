import { UserSkill, UserSkillComponent } from '@/types/craftiroSkills'
import { Academy, UserRole } from '@types'

export type UserSkillXp = {
    skillId: string // unique identifier for the skill
    xp: number // experience points earned in the skill
}

export type UserCraftiroCourseLastVisitStep = {
    courseId: string // unique identifier for the course
    unitSystemId: string // unique identifier for the unit
    levelSystemId: string // unique identifier for the level
    stepSystemId: string // unique identifier for the step
    lastVisitedAt: string // ISO date string for the last visit time
}

export type StepStatus = 'notStarted' | 'inProgress' | 'completed'

export type UserCraftiroCourseStepData = {
    stepSystemId: string // unique identifier for the step
    status: StepStatus // current status of the step
    completionDate?: Date // date when the step was completed, if applicable
}

export type UserCraftiroCourseLevelData = {
    levelSystemId: string // unique identifier for the level
}

export type UserCraftiroCourseUnitData = {
    unitSystemId: string // unique identifier for the unit
}

export type UserCraftiroCourseData = {
    courseId: string // unique identifier for the course
    units: UserCraftiroCourseUnitData[] // list of units in the course
    lastVisitedStep: UserCraftiroCourseLastVisitStep // last visited step in the course
}

export type CraftiroAcademyUserData = {
    craftiroExercises: {
        accessibleIds: string[] // List of accessible exercise IDs
        subscription: {
            isActive: boolean // Indicates if the user has an active subscription
            expiresAt: string // ISO date string for when the subscription expires
            startAt: string // ISO date string for when the subscription started
            plan: 'pro' | 'free' // Indicates the type of subscription plan
        }
    }
    craftiroCourses: {
        accessibleIds: string[] // List of accessible course IDs
        subscription: {
            isActive: boolean // Indicates if the user has an active subscription
            expiresAt: string // ISO date string for when the subscription expires
            plan: 'basic' | 'pro' // Indicates the type of subscription plan
        }
        courses: UserCraftiroCourseData[] // List of courses with user-specific data
    }
    score: {
        xp: number // Total experience points
        skillsXp: UserSkillXp[]
        achievements: {
            [achievementId: string]: {
                progress: number // Progress towards the achievement
            }
        }
    }
    skills: {
        components: UserSkillComponent[] // List of skill components with user-specific data
        mastery: UserSkill[] // List of skills with mastery status
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
