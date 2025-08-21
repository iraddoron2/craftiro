import { Text } from '@craftiro/ui'
import { BaseCard } from '@craftiro/ui-composites'

type Props = {
    description: string
}

export const Description = ({ description }: Props) => {
    return (
        <BaseCard
            title="תיאור"
            style={{
                maxWidth: '800px',
            }}
        >
            <Text variant="body">{description}</Text>
        </BaseCard>
    )
}
