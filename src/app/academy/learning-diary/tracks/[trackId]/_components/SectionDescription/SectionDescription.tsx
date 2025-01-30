import { Text } from '@core'

type Props = {
    description: string
}

export const SectionDescription = ({ description }: Props) => {
    return (
        <Text
            variant="h3"
            sx={{
                fontSize: '24px',
                textAlign: 'center',
            }}
            text={description}
        />
    )
}
