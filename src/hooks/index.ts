// import { LinksGroups } from '@/types'
import { useSession } from 'next-auth/react'

export const useGetUserData = () => {
    const { status } = useSession()
    console.log('status', status)
    return null
}

// type UpdateTabsWithLocalStorageProps = {
//     pathname: string
//     linksGroups: LinksGroups
// }

// export const useUpdateTabsWithLocalStorage
