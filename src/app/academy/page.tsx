import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { TabsNavbar } from '@shared'

const tabsLinksGroups: LinksGroups = [
    [
        { path: '/academy', label: 'עמוד בית' },
        { path: '/academy/learning-diary', label: 'יומן למידה' },
        { path: '/academy/syllabus', label: 'סילבוס' },
    ],
]

export default async function Page() {
    return (
        <Stack
            sx={{
                flexDirection: 'column',
                minHeight: '100vh',
            }}
            className="stack in page"
        >
            <Stack>עמוד הבית של האקדמיה</Stack>
            <TabsNavbar linksGroups={tabsLinksGroups} />
        </Stack>
    )
}
