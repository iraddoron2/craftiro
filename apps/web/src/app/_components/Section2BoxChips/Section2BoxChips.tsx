'use client'

import { Stack } from '@craftiro/ui'
import { BoxChip } from '../../_components'

export const Section2BoxChips = () => {
    return (
        <Stack
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '24px',
                justifyContent: 'end',
                alignItems: 'center',
                width: '800px',
            }}
        >
            <BoxChip
                label="קורסים דיגיטליים"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />
            <BoxChip
                label="שיעורים פרטיים"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />
            <BoxChip
                label="סיכומים"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />
            <BoxChip
                label="משחקים"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />
            <BoxChip
                label="תרגילים"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />
            <BoxChip
                label="אתגרים"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />
        </Stack>
    )
}
