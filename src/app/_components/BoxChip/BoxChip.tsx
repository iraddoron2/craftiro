import { Stack } from '@core'

type Props = {
    label: string
    backgroundColor: string
    textColor: string
}

export const BoxChip = ({ label, backgroundColor, textColor }: Props) => {
    return (
        <Stack
            style={{
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
            }}
        >
            {label}
        </Stack>
    )
}
