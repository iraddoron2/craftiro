import { login } from '@/lib/auth'
import { Stack } from '@craftiro/ui'
import { redirect } from 'next/navigation'

export default async function Page() {
    return (
        <Stack>
            <h1>Sign In</h1>
            <form
                action={async (formData) => {
                    'use server'
                    await login(formData)
                    redirect('/') // Redirect to home page
                }}
            >
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Sign In</button>
            </form>
        </Stack>
    )
}
