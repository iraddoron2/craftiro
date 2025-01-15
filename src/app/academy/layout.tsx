import { Stack } from '@core'
import { PagesNavbar, TabsNavbar } from '@shared'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Stack
            sx={{
                flexDirection: 'column',
                minHeight: '100vh',
                margin: '60px 200px',
            }}
        >
            <PagesNavbar
                links={[
                    { href: '/academy', label: 'עמוד בית' },
                    { href: '/academy/learning-diary', label: 'יומן למידה' },
                    { href: '/academy/syllabus', label: 'סילבוס' },
                    { href: '/academy/objectives', label: 'משימות' },
                    { href: '/academy/moduls', label: 'מודולים' },
                    { href: '/academy/games', label: 'משחקים' },
                    {
                        href: '/academy/online-lessons',
                        label: 'שיעורי אונליין',
                    },
                    { href: '/academy/goals', label: 'מטרות' },
                    { href: '/academy/books', label: 'ספרים' },
                    { href: '/academy/courses', label: 'קורסים' },
                    { href: '/academy/blinks', label: 'בלינקס' },
                    { href: '/academy/certificates', label: 'תעודות' },
                    { href: '/academy/stats', label: 'סטטיסטיקות' },
                    { href: '/academy/requests', label: 'בקשות' },
                    { href: '/academy/plan', label: 'מנוי' },
                ]}
            />
            <Stack>{children}</Stack>
            <TabsNavbar />
        </Stack>
    )
}
