import { useSession } from 'next-auth/react'

export const useGetUserData = () => {
    const { status } = useSession()
    console.log('status', status)
    return null
}
