import { Stack, Text } from '@core'
import { BaseCard } from '@shared'

type Props = {
    mainSubjects: string[]
}

export const MainSubjects = ({ mainSubjects }: Props) => {
    return (
        <BaseCard
            title="נושאים עיקריים"
            sx={{ width: '100%', minWidth: '300px' }}
        >
            {mainSubjects.map((subject, index) => (
                <Stack key={index}>
                    <Text variant="body1" text={subject} />
                </Stack>
            ))}
        </BaseCard>
    )
}
