'use client'

import { getBaseDomain } from '@/helpers'
import { useEffect } from 'react'
import styles from './page.module.css'

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
    useEffect(() => {
        const apiUserCall = `${getBaseDomain()}/api/user`
        const getData = async () => {
            const query = await fetch(apiUserCall)
            const response = await query.json()
            console.log('response from api', response)
        }
        getData()
    }, [])
    return (
        <div className={styles.page}>
            <h1>Craftiro</h1>
            <pre></pre>
        </div>
    )
}
