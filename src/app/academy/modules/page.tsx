import { Stack } from '@/components/core'
import { modules } from '@/data/demoData/modules'
import { ModuleCard } from './_components'

export default function Page() {
    return (
        <Stack>
            <Stack>
                {modules.map((module) => (
                    <ModuleCard key={module._id} moduleId={module._id} />
                ))}
            </Stack>
        </Stack>
    )
}
