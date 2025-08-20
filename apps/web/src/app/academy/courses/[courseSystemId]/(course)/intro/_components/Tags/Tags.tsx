import { Chip, Stack } from '@craftiro/ui'
import { BaseCard } from '@craftiro/ui-composites'

type Props = {
    tags: string[]
}

export const Tags = ({ tags }: Props) => {
    return (
        <BaseCard
            title="תגיות"
            style={{
                width: '100%',
                minWidth: '300px',
            }}
        >
            <Stack
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: '8px',
                    borderRadius: '8px',
                }}
            >
                {tags.map((tag, index) => (
                    <Chip
                        label={tag}
                        key={index}
                        style={{
                            marginRight: '8px',
                            fontSize: '14px',
                            color: '#555',
                            width: 'fit-content',
                        }}
                    />
                ))}
            </Stack>
        </BaseCard>
    )
}
