import { Button, Stack, Text } from '@core'
import { useTheme } from '@hooks'
import { BaseCard } from '@shared'
import Link from 'next/link'

type Props = {
    levelNumber: number
    title: string
    description: string
    courseSystemId: string
    levelId: string
}

// font-family: Assistant;
// font-size: 20px;
// font-style: normal;
// font-weight: 400;
// line-height: normal;

export const LevelCard = ({
    levelNumber,
    title,
    description = '',
    courseSystemId,
    levelId,
}: Props) => {
    const theme = useTheme()

    return (
        <BaseCard
            sx={{
                width: '100%',
                maxWidth: '400px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '52px',
                minWidth: '432px',
            }}
        >
            <Stack sx={{ gap: '8px' }}>
                <Stack
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Text
                        variant="h4"
                        text={`שלב ${levelNumber.toString()}:`}
                        sx={{
                            fontWeight: 500,
                            color: theme.text.onPageBackground,
                        }}
                    />
                    <Text
                        variant="h3"
                        text={title}
                        sx={{
                            fontSize: '32px',
                            fontWeight: 500,
                            color: theme.text.onPageBackground,
                        }}
                    />
                </Stack>
                <Text
                    variant="body1"
                    text={description}
                    sx={{
                        fontSize: '20px',
                    }}
                />
            </Stack>
            <Stack
                sx={{
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <Link
                    href={`/academy/courses/${courseSystemId}/levels/${levelId}`}
                    style={{
                        width: '100%',
                    }}
                >
                    <Button
                        label="כניסה לשלב"
                        color="primary"
                        style={{
                            width: '100%',
                        }}
                    />
                </Link>
            </Stack>
        </BaseCard>
    )
}
