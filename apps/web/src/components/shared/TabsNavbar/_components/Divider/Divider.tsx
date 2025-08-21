import { Stack } from '@craftiro/ui'

export const Divider = () => {
    return (
        <Stack
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Stack
                style={{
                    height: '2px',
                    backgroundColor: '#DDDDDD',
                    margin: '24px 0',
                    width: 'calc(100% - 32px)',
                }}
            />
        </Stack>
    )
}
