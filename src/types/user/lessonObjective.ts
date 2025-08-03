import { TaskStatus } from '@types'

export type LessonObjective = {
    id: string
    title: string
    description: string
    tags: string[]
    status: TaskStatus
}
