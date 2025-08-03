import { ExerciseStyle } from '../common'
import { ExerciseBase } from './exerciseBase'
import { ExerciseDiagramStyle } from './exerciseDiagramStyle'
import { ExerciseVersion } from './exerciseVersion'

export type PianoScorePlayingExercise = ExerciseBase & {
    diagramStyle?: ExerciseDiagramStyle // Style of the diagram (Lead Sheet, Sheet Music, etc.)
    style?: ExerciseStyle | null
    mainVersion?: ExerciseVersion // Main version of the exercise
    versions?: ExerciseVersion[] // Array of versions with metadata, details, assets
}
