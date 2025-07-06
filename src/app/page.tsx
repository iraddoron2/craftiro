import styles from './page.module.css'

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

export default async function Home() {
    // const session = await getSession()

    return (
        <div className={styles.page}>
            {/* <h1>Craftiro</h1> */}
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        </div>
    )
}
