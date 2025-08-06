import { Stack } from '@core'
import { CraftiroTextSegment } from '@types'
import Link from 'next/link'

type Props = {
    segment: CraftiroTextSegment
}
export const TextSegment = ({ segment }: Props) => {
    const { text, linkUrl } = segment

    if (!linkUrl) {
        return <Stack component="span">{text}</Stack>
    } else {
        return (
            <Link href={linkUrl}>
                <Stack component="span">{text}</Stack>
            </Link>
        )
    }
}
