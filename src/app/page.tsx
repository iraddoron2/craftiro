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
    return (
        <div
            style={{
                minHeight: '100vh',
                transition: 'background 0.2s',
            }}
        >
            <div style={{ margin: '32px auto', textAlign: 'center' }}></div>
        </div>
    )
}
