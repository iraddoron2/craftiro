import { Stack } from '@craftiro/ui'
import { FullWidthCardTitle } from './FullWidthCardTitle'

type Props = {
    children?: React.ReactNode
    style?: React.CSSProperties
    title?: string
    color?: 'blue' | 'orange' | 'green' | 'purple' | 'red'
}

export const FullWidthCard = ({
    children = <></>,
    style,
    title,
    color = 'blue',
}: Props) => {
    return (
        <Stack
            style={{
                width: '100%',
                backgroundColor: `var(--color-${color}-170)`,
                borderRadius: '16px',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: `var(--color-divider-main)`,
                boxSizing: 'border-box',
                padding: '24px',
                opacity: 0.9,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                ...style,
            }}
        >
            {title && <FullWidthCardTitle title={title} />}
            {children}
        </Stack>
    )
}
