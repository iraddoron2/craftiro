import { Stack } from '@/components/core'
import { modules } from '@/data/demoData/modules'
import { ModuleCard } from './_components'

export default function Page() {
    return (
        <Stack>
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    maxWidth: '1200px',
                }}
            >
                {modules.map((module) => (
                    <ModuleCard key={module._id} moduleId={module._id} />
                ))}
            </Stack>
        </Stack>
    )
}
