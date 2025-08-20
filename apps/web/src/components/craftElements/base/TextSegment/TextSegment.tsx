import { CraftiroTextSegment } from '@/types'
import { Stack } from '@craftiro/ui'
import Link from 'next/link'

type Props = {
    segment: CraftiroTextSegment
}
export const TextSegment = ({ segment }: Props) => {
    const { text, linkUrl } = segment

    if (!linkUrl) {
        return <Stack as="span">{text}</Stack>
    } else {
        return (
            <Link href={linkUrl}>
                <Stack as="span">{text}</Stack>
            </Link>
        )
    }
}
