import { Stack } from '@core'
import { GoogleSignInButton, UserInfo } from '@shared'

export default function Page() {
    return (
        <Stack>
            <h1>Sign In</h1>
            <GoogleSignInButton />
            <UserInfo />
        </Stack>
    )
}
