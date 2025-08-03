import { CraftElement } from '../craftElements'

export type ExerciseFeedback = {
    source?: 'none' | 'instructor' | 'system' | 'community'
    mediaType?: 'text' | 'video' | 'image'
    content?: CraftElement[] // Feedback content, can be text, video link, or image
}
