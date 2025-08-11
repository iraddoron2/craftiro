import { Stack, Text } from '@core'
import { useTheme } from '@hooks'

type Props = {
    title: string
    subtitle: string
}

export const MiroHeader = ({ title, subtitle }: Props) => {
    const theme = useTheme()
    return (
        <Stack
            sx={{
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
            component={'section'}
        >
            <Text
                variant={'h1'}
                text={title}
                sx={{
                    color: theme.text.onContrastBackground,
                    textAlign: 'center',
                    fontFamily: 'Assistant',
                    fontSize: '52px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                }}
            />
            <Text
                variant={'h2'}
                text={subtitle}
                sx={{
                    color: theme.text.onContrastBackground,
                    textAlign: 'center',
                    fontFamily: 'Assistant',
                    fontSize: '32px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal',
                }}
            />
        </Stack>
    )
}
