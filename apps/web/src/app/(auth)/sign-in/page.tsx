import { Input, MainBackground, SystemHomePageTitle } from '@/components'
import { login } from '@/lib/auth'
import { Stack } from '@craftiro/ui'
import { redirect } from 'next/navigation'
import { SignInButton } from './_components'

export default async function Page() {
    return (
        <Stack
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <SystemHomePageTitle
                title="כניסה למערכת"
                subtitle="רשמו את פרטי הכניסה שלכם"
            />
            <MainBackground />

            <form
                action={async (formData) => {
                    'use server'
                    await login(formData)
                    redirect('/') // Redirect to home page
                }}
            >
                <Stack
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                        width: '100%',
                        maxWidth: '400px',
                        marginTop: '80px',
                    }}
                >
                    <Input
                        type="email"
                        placeholder="אימייל..."
                        name="email"
                        style={{
                            width: '420px',
                        }}
                        autoComplete="email"
                        required
                    />
                    <Input
                        type="password"
                        placeholder="סיסמה..."
                        name="password"
                        style={{
                            width: '420px',
                        }}
                        autoComplete="current-password"
                        required
                    />
                    <SignInButton />
                </Stack>
            </form>
        </Stack>
    )
}
