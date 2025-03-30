import { currentUser } from '@/data'
import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { MainLinkButton, SectionTitleWithLines, TabsNavbar } from '@shared'

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
    const { tracks } = currentUser.academy.learningDiary

    return (
        <Stack>
            {tracks.map((track, index) => {
                const { startingDate, title, id } = track
                return (
                    <Stack key={index}>
                        <SectionTitleWithLines
                            title={startingDate.getFullYear()}
                        />
                        <MainLinkButton
                            label={title}
                            path={`/academy/learning-diary/tracks/${id}`}
                        />
                    </Stack>
                )
            })}
            <TabsNavbar linksGroups={linksGroups} />
        </Stack>
    )
}
