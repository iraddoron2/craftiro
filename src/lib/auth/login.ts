import User from '@/models/user'
import argon2 from 'argon2'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { connectMongoDB } from '../mongodb'
import { encrypt } from './encrypt'

const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

export const login = async (formData: FormData) => {
    // Get user email and password from the form data
    const userLoginInfo = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    // Check if the user exists in the database
    await connectMongoDB()
    const user = await User.findOne({ email: userLoginInfo.email })

    // Redirect to the sign-in page if the user doesn't exist
    if (!user) {
        redirect('/sign-in')
    }

    // Check if the password is correct
    const passwordCorrect = await argon2.verify(
        user.hashedPassword,
        userLoginInfo.password
    )

    // Redirect to the sign-in page if the password is incorrect
    if (!passwordCorrect) {
        redirect('/sign-in')
    }

    // Create the session
    const expires = new Date(Date.now() + 10 * day)
    const session = await encrypt({ user, expires })

    // Save the session in a cookie
    ;(
        await // Save the session in a cookie
        cookies()
    ).set('session', session, { expires, httpOnly: true })
}
