import { DriveChartsLink, ExerciseExplanationVideo } from '../common'
import { CraftElement } from '../craftElements'

export type ExerciseVersion = {
    _id: string // Unique identifier for the version
    meta: {
        authorsIds?: string[] | null // Array of author IDs. Example: ['123', '456']
        createdAt?: string | null // Creation timestamp (ISO string)
        updatedAt?: string | null // Last update timestamp (ISO string)
        version?: number | null // Version number, e.g. 1.0, 2.0
    }
    details: {
        name?: string | null // Name of the version, e.g. 'Initial Release', 'Updated with new exercises'
        description?: string | null // Description of changes in this version
    }
    assets: {
        driveChartsLinks?: DriveChartsLink[] | null // Links to files (PDF, sheets, video, etc). Example: ['https://drive.google.com/xyz']
        resources?: { key: string; value: CraftElement[] }[] | null // Additional resources (links, YouTube, worksheets). Example: ['https://youtube.com/...']
        solution?: CraftElement[] | null // Sample solution or answer. Example: 'Correct notes: C D E F G' or image/video link
        explanationVideo?: ExerciseExplanationVideo | null // Video demonstration with optional URL
        abcNotation?: string | null // ABC notation for the exercise, if applicable
    }
}
