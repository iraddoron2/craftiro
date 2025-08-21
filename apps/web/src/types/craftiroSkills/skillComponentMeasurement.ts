import {
    SkillComponentMeasurementInstructorEval,
    SkillComponentMeasurementTempo,
    SkillComponentMeasurementTest,
} from '@/types/craftiroSkills'

export type SkillComponentMeasurement =
    | SkillComponentMeasurementTempo
    | SkillComponentMeasurementTest
    | SkillComponentMeasurementInstructorEval
