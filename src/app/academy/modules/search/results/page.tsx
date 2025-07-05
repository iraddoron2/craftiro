'use client'

import { Input, Stack, Text } from '@core'

export default function Page() {
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
        </Stack>
    )
}
