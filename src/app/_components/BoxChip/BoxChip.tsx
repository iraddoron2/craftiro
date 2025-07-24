import { Stack } from '@core'
import type { SxProps } from '@mui/material'

type Props = {
    label: string
    backgroundColor: string
    textColor: string
    sx?: SxProps // הוספנו את האפשרות לקבל sx
}

export const BoxChip = ({ label, backgroundColor, textColor, sx }: Props) => {
    return (
        <Stack
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                padding: '8px 16px',
                backgroundColor,
                color: textColor,
                borderRadius: '12px',
                fontWeight: 'bold',
                width: '314px',
                height: '100px',
                textAlign: 'center',
                ...sx,
            }}
        >
            {label}
        </Stack>
    )
}
