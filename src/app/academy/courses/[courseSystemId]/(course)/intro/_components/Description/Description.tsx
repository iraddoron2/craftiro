import { Text } from '@core'
import { BaseCard } from '@shared'

type Props = {
    description: string
}

export const Description = ({ description }: Props) => {
    return (
        <BaseCard title="תיאור">
            <Text variant="body1" text={description} />
        </BaseCard>
    )
}
