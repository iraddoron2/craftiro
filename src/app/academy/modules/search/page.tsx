'use client'

import { Input, Stack, Text } from '@core'
// import something to progrematically change page to result page
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    const onSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log('search clicked')
        router.push('/academy/modules/search/results')
    }
    return (
        <Stack>
            <Stack>
                <Text text="חיפוש לפי מספר מזהה" />
                <Input
                    placeholder="חפש לפי מספר מזהה"
                    onChange={(e) => console.log(e.target.value)}
                    className="w-full max-w-[400px]"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    autoFocus
                    type="search"
                />
            </Stack>
            <button onClick={onSearchClick}>
                <Text text="חפש" />
            </button>
            <button onClick={onSearchClick}>
                <Text text="כל המודולים" />
            </button>
        </Stack>
    )
}
