export type CraftiroEssayTest = {
    id: string
    type: 'test'
    title: string
    description?: string
    questions: {
        questionId: string
        questionText: string
        options: {
            optionId: string
            optionText: string
            isCorrect: boolean
        }[]
    }[]
}
