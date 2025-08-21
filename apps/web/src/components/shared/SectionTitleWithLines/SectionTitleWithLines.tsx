import { Stack, Text } from '@craftiro/ui'

const Line = () => {
    return (
        <Stack
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                width: '100%',
            }}
        >
            <hr
                style={{
                    width: '100%',
                    border: '1px solid #000',
                }}
            />
        </Stack>
    )
}

type TitleProps = {
    title: string
}
const Title = ({ title }: TitleProps) => {
    return (
        <Text
            variant={'h2'}
            style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '32px',
                width: '100%',
            }}
        >
            {title}
        </Text>
    )
}

type SectionTitleWithLinesProps = {
    title: string | number
}

export const SectionTitleWithLines = ({
    title,
}: SectionTitleWithLinesProps) => {
    return (
        <Stack
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Line />
            <Title title={title.toString()} />
            <Line />
        </Stack>
    )
}
