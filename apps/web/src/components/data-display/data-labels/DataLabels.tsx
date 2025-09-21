import { Stack, Text } from '@craftiro/ui'
import type { DataLabelsProps } from './types'

export const DataLabels = ({ data }: DataLabelsProps) => {
    return (
        <Stack
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stack
                style={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    width: 'fit-content',
                    borderColor: 'var(--color-divider-main)',
                    borderRadius: '16px',
                    padding: '16px',
                    backgroundColor: 'var(--color-intent-secondary-subtle)',
                    gap: '24px',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {data.map((item, index) => (
                    <Stack
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '38px',
                                fontWeight: 700,
                                color: 'var(--color-secondary-on-subtle)',
                            }}
                        >
                            {item.value}
                        </Text>
                        <Text
                            style={{
                                fontWeight: 300,
                                color: 'var(--color-text-secondary)',
                                fontSize: '24px',
                                marginTop: '-8px',
                            }}
                        >
                            {item.label}
                        </Text>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    )
}
