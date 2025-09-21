import { CraftiroElementBase } from './craftiroElementBase'

export type CraftiroYoutubeVideo = CraftiroElementBase & {
    type: 'youtubeVideo'
    /** הקישור המקורי שהוזן, למשל: https://youtu.be/kPWfIBGaIlU */
    content: string
}
