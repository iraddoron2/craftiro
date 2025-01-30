import { Text } from '@core'

type Props = {
    title: string
}

export const TrackTitle = ({ title }: Props) => {
    return (
        <Text
            variant="h1"
            sx={{
                textAlign: 'center',
                marginBottom: '20px',
                fontSize: '48px',
            }}
            text={`מסלול ${title}`}
        />
    )
}
