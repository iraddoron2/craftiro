import { getSession } from '@/lib/auth'
import { LinksGroups, User } from '@/types'
import { getTrackFromTrackId } from '@/utils'
import { Stack } from '@core'
import { TabsNavbar } from '@shared'
import {
    LessonButtonLink,
    SectionDescription,
    SectionTitle,
    TrackTitle,
} from './_components'

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
type Props = {
    params: Promise<{ trackId: string }>
}

export default async function Page({ params }: Props) {
    const { trackId: trackId } = (await params) as { trackId: string }
    const session = await getSession()
    const user = session?.user as User | null
    if (!user) {
        return <h1>Loading...</h1>
    }

    const track = getTrackFromTrackId(user, trackId)

    if (!track) {
        return <h1>Track not found</h1>
    }

    const { title, sections } = track

    return (
        <Stack>
            <TrackTitle title={title} />
            <Stack>
                {sections.map((section, index) => {
                    const {
                        id: sectionId,
                        title,
                        description,
                        lessons,
                    } = section
                    return (
                        <Stack
                            key={sectionId}
                            sx={{
                                gap: '24px',
                            }}
                        >
                            <SectionTitle title={title} index={index} />
                            <SectionDescription description={description} />
                            <Stack
                                sx={{
                                    display: 'flex',
                                    margin: '0 auto',
                                    gap: '24px',
                                    justifyContent: 'center',
                                }}
                            >
                                {lessons.map((lesson, index) => {
                                    const { id: lessonId } = lesson

                                    return (
                                        <LessonButtonLink
                                            key={lessonId}
                                            label={`שיעור ${index + 1}`}
                                            path={`/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}`}
                                        />
                                    )
                                })}
                            </Stack>
                        </Stack>
                    )
                })}
            </Stack>
            <TabsNavbar linksGroups={linksGroups} />
        </Stack>
    )
}
