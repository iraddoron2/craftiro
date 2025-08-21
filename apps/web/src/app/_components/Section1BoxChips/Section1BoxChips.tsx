'use client'

import { Stack } from '@craftiro/ui'
import { BoxChip } from '../../_components'

export const Section1BoxChips = () => {
    return (
        <Stack
            style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'start',
                width: '100%',
                padding: '0px 80px',
            }}
        >
            <BoxChip
                label="נגינת שירים בפסנתר"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />

            <BoxChip
                label="תיאוריית המוזיקה"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />
            <BoxChip
                label="אלתורים"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />
            <BoxChip
                label="הלחנה"
                backgroundColor="var(--color-background-main)"
                textColor="var(--color-text-on-contrast-background)"
            />
        </Stack>
    )
}
