'use client'

export default function FullscreenLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // No header/nav/spacers here
    return <>{children}</>
}

// Optionally force dynamic rendering:
// export const dynamic = 'force-dynamic'
