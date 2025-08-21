import { CraftiroElement } from '../craftiroElements'

export type ExerciseFeedback = {
    source?: 'none' | 'instructor' | 'system' | 'community'
    mediaType?: 'text' | 'video' | 'image'
    content?: CraftiroElement[] // Feedback content, can be text, video link, or image
}
