import { Stack, Text } from '@craftiro/ui'
import { BaseCard } from '@craftiro/ui-composites'

type Props = {
    mainSubjects: string[]
}

export const MainSubjects = ({ mainSubjects }: Props) => {
    return (
        <BaseCard
            title="נושאים עיקריים"
            style={{ width: '100%', minWidth: '300px' }}
        >
            {mainSubjects.map((subject, index) => (
                <Stack key={index}>
                    <Text variant="body">{subject}</Text>
                </Stack>
            ))}
        </BaseCard>
    )
}
