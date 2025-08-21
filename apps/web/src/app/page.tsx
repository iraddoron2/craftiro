import { Stack } from '@craftiro/ui'
import { Section1, Section2 } from './_components'

export default function Home() {
    return (
        <Stack direction="column" gap={0} style={{ width: '100vw' }}>
            <Section1 />
            <Section2 />
        </Stack>
    )
}
