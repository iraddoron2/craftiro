import { modules } from '@/data/demoData/modules'
import { Stack } from '@craftiro/ui'
import { ModuleCard } from './_components'

export default function Page() {
    return (
        <Stack>
            <Stack
                style={{
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
