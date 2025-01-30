import { SectionTitleWithLines } from '@shared'

type Props = {
    index: number
    title: string
}

export const SectionTitle = ({ index, title }: Props) => {
    return <SectionTitleWithLines title={`חלק ${index + 1}: ${title}`} />
}
