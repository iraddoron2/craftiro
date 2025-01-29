import { Stack, Text } from '@core'

export const SignInProfileImage = () => {
    return (
        <Stack
            sx={{
                borderRadius: '500px',
                padding: '10px',
                overflow: 'hidden',
                backgroundColor: 'white',
                border: '3px solid #2266C7',
                '&:hover': {
                    backgroundColor: '#2266C7',
                    cursor: 'pointer',
                    color: 'white',
                },
            }}
        >
            <Text text="כניסה" />
        </Stack>
    )
}
