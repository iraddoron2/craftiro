export type CraftiroInfographic = {
    _id: string // unique identifier for the infographic
    systemId: string // system identifier for the infographic
    domain: string // domain of the infographic (e.g., "music", "art")
    category: string // category of the infographic (e.g., "instrument", "technique")
    title: string // title of the infographic
    shortDescription: string // brief description of the infographic
    longDescription: string // detailed description of the infographic
    tags: string[] // tags for categorization (e.g., "beginner", "advanced")
    accessibility: 'free' | 'pro' // accessibility of the infographic
    age: number // recommended age for the infographic
    price: number // price of the infographic
}
