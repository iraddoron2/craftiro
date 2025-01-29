import styles from './page.module.css'

// import { getSession } from '@/lib/auth'

export default async function Home() {
    // const session = await getSession()

    return (
        <div className={styles.page}>
            <h1>Craftiro</h1>
        </div>
    )
}
