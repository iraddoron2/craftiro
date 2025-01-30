import { TabsNavbar } from '@/components/shared'
import { LinksGroups } from '@/types'
import { Stack } from '@core'

const linksGroups: LinksGroups = [
    [
        { path: '/academy/learning-diary', label: 'מסך ראשי' },
        {
            path: '/academy/learning-diary/full-diary',
            label: 'יומן מלא',
        },
        {
            path: '/academy/learning-diary/tracks-in-progress',
            label: 'מסלולים בתהליך',
        },
    ],
]
export default function Page() {
    return (
        <Stack>
            <h1>יומן למידה</h1>
            <TabsNavbar linksGroups={linksGroups} />
        </Stack>
    )
}
