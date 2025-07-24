'use client'
// import styles from './page.module.css'

import { Stack } from '@core'
import { Section1, Section2 } from './_components'

// import { getSession } from '@/lib/auth'

// const getUserFromDb = async () => {
//     const apiUserCall = `${getBaseDomain()}/api/user`
//     try {
//         const res = await fetch(apiUserCall, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })

//         if (!res.ok) {
//             throw new Error(`Response status: ${res.status}`)
//         }

//         const resData = JSON.stringify(res)
//         console.log('resData', resData)
//         return resData
//     } catch (error) {
//         console.error('Error getting user', error)
//         return NextResponse.redirect(new URL('/sign-in'))
//     }
// }

export default function Home() {
    return (
        <Stack
            direction="column"
            sx={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }}
        >
            <Section1 />
            <Section2 />
        </Stack>
    )
}
