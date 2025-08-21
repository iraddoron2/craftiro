import { Stack, Text } from '@craftiro/ui'

type Props = {
    title: string
    subtitle: string
}

export const MiroHeader = ({ title, subtitle }: Props) => {
    return (
        <Stack
            style={{
                height: '248px',
                width: '100%',
                backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.5), 
    rgba(0, 0, 0, 0.4)
  ), url("/backgrounds/Miro Background 8.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                gap: '16px',
            }}
            as={'section'}
        >
            <Text
                variant={'h1'}
                style={{
                    color: 'var(--color-text-on-contrast-background)',
                    textAlign: 'center',
                    fontFamily: 'Assistant',
                    fontSize: '52px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                }}
            >
                {title}
            </Text>
            <Text
                variant={'h2'}
                style={{
                    color: 'var(--color-text-on-contrast-background)',
                    textAlign: 'center',
                    fontFamily: 'Assistant',
                    fontSize: '32px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal',
                }}
            >
                {subtitle}
            </Text>
        </Stack>
    )
}
