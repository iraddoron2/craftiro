'use client'

import { Input, Stack, Text } from '@craftiro/ui'

export default function Page() {
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
        </Stack>
    )
}
