'use client'

import { Input, Stack, Text } from '@craftiro/ui'
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
                <Text>חיפוש לפי מספר מזהה</Text>
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
                <Text>חפש</Text>
            </button>
            <button onClick={onSearchClick}>
                <Text>כל המודולים</Text>
            </button>
        </Stack>
    )
}
