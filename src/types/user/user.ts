import { Academy, UserRole } from '@types'

export type User = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    hashedPassword: string
    roles: UserRole[]
    academy: Academy
}
