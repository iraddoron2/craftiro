import { CraftiroTextSegment } from '@/types'
import { Stack } from '@craftiro/ui'
import Link from 'next/link'

type Props = {
    segment: CraftiroTextSegment
}
export const TextSegment = ({ segment }: Props) => {
    const { content, linkUrl } = segment

    if (!linkUrl) {
        return (
            <Stack
                as="span"
                style={{
                    fontSize: '22px',
                    color: 'var(--color-text-primary)',
                    textAlign: 'right',
                }}
            >
                {content}
            </Stack>
        )
    } else {
        return (
            <Link href={linkUrl}>
                <Stack as="span">{content}</Stack>
            </Link>
        )
    }
}
