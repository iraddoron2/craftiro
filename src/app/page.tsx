'use client'

import { colors } from '@/styles'
import { useState } from 'react'
// import styles from './page.module.css'

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
    const [hover, setHover] = useState(false)

    return (
        <div>
            <h1
                style={{
                    fontSize: '2rem',
                    textAlign: 'center',
                    marginTop: '200px',
                    color: colors.brandBlue.lightest,
                    backgroundColor: hover
                        ? colors.brandBlue.dark
                        : colors.brandBlue.main,
                    padding: '20px',
                    transition: 'background-color 0.1s ease',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                Hello
            </h1>
        </div>
    )
}
