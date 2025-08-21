import { cookies } from 'next/headers'

export const logout = async () => {
    // Destroy the session
    ;(
        await // Destroy the session
        cookies()
    ).set('session', '', { expires: new Date(0) })
}
