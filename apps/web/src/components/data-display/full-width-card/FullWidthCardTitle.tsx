import { Text } from '@craftiro/ui'

type Props = {
    title: string
}

export const FullWidthCardTitle = ({ title }: Props) => {
    return (
        <Text
            style={{
                color: 'var(--color-text-on-background)',
                textAlign: 'center',
                fontFamily: 'Assistant',
                fontSize: '64px',
                fontStyle: 'normal',
                fontWeight: 800,
                lineHeight: 'normal',
            }}
        >
            {title}
        </Text>
    )
}
