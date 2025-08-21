import { Stack } from '@craftiro/ui'

type Props = {
    label: string
    backgroundColor: string
    textColor: string
    style?: React.CSSProperties
}

export const BoxChip = ({
    label,
    backgroundColor,
    textColor,
    style,
}: Props) => {
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
                ...style,
            }}
        >
            {label}
        </Stack>
    )
}
