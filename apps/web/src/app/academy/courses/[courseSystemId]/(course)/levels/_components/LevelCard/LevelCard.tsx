import { Button, Stack, Text } from '@craftiro/ui'
import { BaseCard } from '@craftiro/ui-composites'
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
    return (
        <BaseCard
            style={{
                width: '100%',
                maxWidth: '400px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '52px',
                minWidth: '432px',
            }}
        >
            <Stack style={{ gap: '8px' }}>
                <Stack
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Text
                        variant="h4"
                        style={{
                            fontWeight: 500,
                            color: 'var(--color-text-on-background)',
                        }}
                    >
                        `שלב ${levelNumber.toString()}:
                    </Text>
                    <Text
                        variant="h3"
                        style={{
                            fontSize: '32px',
                            fontWeight: 500,
                            color: 'var(--color-text-on-background)',
                        }}
                    >
                        {title}
                    </Text>
                </Stack>
                <Text
                    variant="body"
                    style={{
                        fontSize: '20px',
                    }}
                >
                    {description}
                </Text>
            </Stack>
            <Stack
                style={{
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
