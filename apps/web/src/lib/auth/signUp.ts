import User from '@/models/user'
import { Academy, User as UserType } from '@/types'
import argon2 from 'argon2'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { connectMongoDB } from '../mongodb'
import { encrypt } from './encrypt'

const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

const defaultRolesArray = ['user']

const academyDefaultObject = {
    startingDate: null,
    plan: 'free',
    active: {
        expiredDate: null,
    },
    learningDiary: {
        tracks: [],
    },
    modulesStatus: [],
    musicStudies: {
        musicPieces: [],
    },
} as Academy

export const signUp = async (formData: FormData) => {
    // Get user email from the form data
    const userEmail = formData.get('email')

    // Check if the user already exists
    await connectMongoDB()
    const userFromDatabase = await User.findOne({ email: userEmail })

    if (userFromDatabase) {
        redirect('/sign-in')
    }

    // Create new hashed password
    const password = formData.get('password') as string
    const hashedPassword = await argon2.hash(password)

    // Create a new user based on the schema and the form data
    const user = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        username: formData.get('username'),
        email: userEmail,
        hashedPassword: hashedPassword,
        roles: defaultRolesArray,
        academy: academyDefaultObject,
    } as unknown as UserType

    // Save the user in the database
    await User.create(user)

    // Create the session
    const expires = new Date(Date.now() + 10 * day)

    const session = await encrypt({ user, expires })

    // Save the session in a cookie
    ;(
        await // Save the session in a cookie
        cookies()
    ).set('session', session, { expires, httpOnly: true })
}
