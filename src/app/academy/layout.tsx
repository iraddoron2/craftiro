import { Stack } from '@core'
import { PagesNavbar } from '@shared'

const pagesLinks = [
    { path: '/academy', label: 'עמוד בית' },
    { path: '/academy/learning-diary', label: 'יומן למידה' },
    { path: '/academy/syllabus', label: 'סילבוס' },
    { path: '/academy/objectives', label: 'משימות' },
    { path: '/academy/moduls', label: 'מודולים' },
    { path: '/academy/games', label: 'משחקים' },
    {
        path: '/academy/online-lessons',
        label: 'שיעורי אונליין',
    },
    { path: '/academy/goals', label: 'מטרות' },
    { path: '/academy/books', label: 'ספרים' },
    { path: '/academy/courses', label: 'קורסים' },
    { path: '/academy/blinks', label: 'בלינקס' },
    { path: '/academy/certificates', label: 'תעודות' },
    { path: '/academy/stats', label: 'סטטיסטיקות' },
    { path: '/academy/requests', label: 'בקשות' },
    { path: '/academy/plan', label: 'מנוי' },
]

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Stack sx={{ flexDirection: 'column', minHeight: '100vh' }}>
            <PagesNavbar links={pagesLinks} />
            <Stack>{children}</Stack>
        </Stack>
    )
}
