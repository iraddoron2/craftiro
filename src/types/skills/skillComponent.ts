import { SkillLevel } from "@types"

// A skill component, e.g., "Play white key roots"
export type SkillComponent = {
    componentId: string // Unique within the skill (e.g., 'white-roots')
    name: string // Name of component
    levels: SkillLevel[] // Array of levels for this component
}
