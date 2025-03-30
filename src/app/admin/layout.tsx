import { Stack } from '@core'
import { PagesNavbar } from '@shared'

const pagesLinks = [
    { path: '/admin', label: 'עמוד בית' },
    { path: '/admin/users', label: 'לקוחות' },
    { path: '/admin/commitments', label: 'מחויבויות' },
    { path: '/admin/requests', label: 'בקשות' },
    { path: '/admin/extras', label: 'תוספות' },
    { path: '/admin/services', label: 'שירותים' },
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
