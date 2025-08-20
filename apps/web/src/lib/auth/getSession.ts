import { cookies } from 'next/headers'
import { decrypt } from './decrypt'

export const getSession = async () => {
    const session = (await cookies()).get('session')?.value

    if (!session) return null
    return await decrypt(session)
}
