import { Stack } from '@core'
import { CraftParagraph } from '@types'
import { TextSegment } from '../TextSegment/TextSegment'

type Props = {
    paragraph: CraftParagraph
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

    const parsedTextSegments = content.map((segment, index) => {
        return <TextSegment key={`${id}-segment-${index}`} segment={segment} />
    })

    return (
        <Stack component="p" className={className} style={style}>
            {parsedTextSegments}
        </Stack>
    )
}
