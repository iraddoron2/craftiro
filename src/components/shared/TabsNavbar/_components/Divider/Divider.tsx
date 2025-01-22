import { Stack } from '@core'

export const Divider = () => {
    return (
        <Stack
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Stack
                sx={{
                    height: '2px',
                    backgroundColor: '#DDDDDD',
                    margin: '24px 0',
                    width: 'calc(100% - 32px)',
                }}
            />
        </Stack>
    )
}
