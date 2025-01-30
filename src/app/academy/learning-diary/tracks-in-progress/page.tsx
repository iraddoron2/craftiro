import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { TabsNavbar } from '@shared'

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
            <h1>Tracks in progress</h1>
            <TabsNavbar linksGroups={linksGroups} />
        </Stack>
    )
}
