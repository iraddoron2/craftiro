import type { CraftiroParagraph, CraftiroTextSegment } from '@/types'
import { Stack } from '@craftiro/ui'
import React, { useMemo } from 'react'
import { TextSegment } from '../TextSegment/TextSegment'

type Props = { paragraph: CraftiroParagraph }

// Runtime guard – מקבל כל דבר ומחזיר תמיד מערך של CraftiroTextSegment
function toTextSegments(input: unknown): CraftiroTextSegment[] {
    // אם זה כבר מערך של סגמנטים – נחזיר כפי שהוא
    if (Array.isArray(input)) {
        return input.filter(isCraftiroTextSegment)
    }

    // אם הגיע מחרוזת – נהפוך לסגמנט טקסט בסיסי
    if (typeof input === 'string') {
        return [
            {
                type: 'textSegment',
                content: input,
                id:
                    crypto.randomUUID?.() ??
                    Math.random().toString(36).slice(2),
            } as CraftiroTextSegment,
        ]
    }

    // אחרת – נחזיר ריק (וניתן לוג)
    if (input != null) {
        // אפשר להחליף ב-logger שלך
        // console.warn('Paragraph.content is not an array/string:', input)
    }
    return []
}

// type predicate: בודק שזה אובייקט עם type === 'textSegment' ו-text מחרוזת
function isCraftiroTextSegment(x: unknown): x is CraftiroTextSegment {
    return (
        !!x &&
        typeof x === 'object' &&
        (x as Record<string, unknown>).type === 'textSegment' &&
        typeof (x as Record<string, unknown>).text === 'string'
    )
}

export const Paragraph = ({ paragraph }: Props) => {
    const { content, id, style, className } = paragraph

    const segments = useMemo(() => toTextSegments(content), [content])

    if (!segments.length) {
        // אפשר להחזיר null אם אתה מעדיף לא לרנדר בכלל
        return <Stack as="p" className={className} style={style} />
    }

    return (
        <Stack
            as="p"
            className={className}
            style={{
                marginBottom: '12px',
                maxWidth: '1000px',
                userSelect: 'text',
                ...style,
            }}
        >
            {segments.map((segment, index) => (
                <TextSegment key={`${id}-segment-${index}`} segment={segment} />
            ))}
        </Stack>
    )
}
