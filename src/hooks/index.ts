// import { LinksGroups } from '@/types'
// import { getBaseDomain } from '@/helpers'
import { User } from '@/types'
// import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

// export const useSessionStatus = () => {
//     const { status } = useSession()
//     return null
// }

// type UpdateTabsWithLocalStorageProps = {
//     pathname: string
//     linksGroups: LinksGroups
// }

// export const useUpdateTabsWithLocalStorage

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchUser() {
            try {
                setIsLoading(true)
                const response = await fetch('/api/user') // Adjust the path if needed
                if (!response.ok) {
                    throw new Error(
                        `Error fetching user: ${response.statusText}`
                    )
                }
                const data = await response.json()
                setUser(data.body)
            } catch (err) {
                setError(err as Error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [])

    return { user, isLoading, error }
}
