'use client'

import { signUp } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default function Page() {
    return (
        <section>
            <form
                action={async (formData) => {
                    'use server'
                    await signUp(formData)
                    redirect('/') // Redirect to home page
                }}
            >
                <h1>Sign Up</h1>
                <input type="text" placeholder="First Name" name="firstName" />
                <input type="text" placeholder="Last Name" name="lastName" />
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                />
                <button type="submit">Sign Up</button>
            </form>
        </section>
    )
}
