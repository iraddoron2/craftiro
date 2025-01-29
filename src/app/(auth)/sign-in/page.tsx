// import { login } from '@/lib/auth'
import { Stack, Text } from '@core'
// import { redirect } from 'next/navigation'

export default async function Page() {
    return (
        <Stack>
            {/* <h1>כניסה למערכת</h1>
            <form
                action={async (formData) => {
                    'use server'
                    await login(formData)
                    redirect('/') // Redirect to home page
                }}
            >
                <label>
                    <Text text="אימייל" />
                    <input type="email" placeholder="Email" name="email" />
                </label>
                <label>
                    <Text text="סיסמה" />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </label>
                <br />
                <br />
                <button type="submit">כניסה</button>
            </form> */}
        </Stack>
    )
}
