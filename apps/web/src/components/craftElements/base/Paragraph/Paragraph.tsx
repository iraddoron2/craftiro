import { CraftiroParagraph } from '@/types'
import { Stack } from '@craftiro/ui'
import { TextSegment } from '../TextSegment/TextSegment'

type Props = {
    paragraph: CraftiroParagraph
}

export const Paragraph = ({ paragraph }: Props) => {
    const {
        // type,
        content,
        id,
        style,
        className,
        // createdAt,
        // updatedAt,
        // authorId,
        // customAttributes,
    } = paragraph

    interface ParsedTextSegment {
        key: string
        segment: CraftiroParagraph['content'][number]
    }

    const parsedTextSegments: React.ReactNode[] = content.map(
        (
            segment: CraftiroParagraph['content'][number],
            index: number
        ): React.ReactElement<ParsedTextSegment> => {
            return (
                <TextSegment key={`${id}-segment-${index}`} segment={segment} />
            )
        }
    )

    return (
        <Stack as="p" className={className} style={style}>
            {parsedTextSegments}
        </Stack>
    )
}
