import { Paragraph } from '@/components/craftiroElements/base'
import { YoutubeVideo } from '@/components/craftiroElements/media'
import { CraftiroElement } from '@/types'

type Props = {
    element: CraftiroElement
}

export const CraftiroCourseElementRenderer = ({ element }: Props) => {
    switch (element.type) {
        case 'paragraph':
            return <Paragraph paragraph={element} />

        case 'youtubeVideo':
            return <YoutubeVideo content={element} />
        default:
            return <p>Unsupported element type: {element.type}</p>
    }
}
