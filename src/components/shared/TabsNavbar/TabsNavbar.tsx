'use client'

import { Stack } from '@core'

export const TabsNavbar = () => {
    return (
        <Stack
            sx={{
                position: 'fixed',
                boxShadow: '0px 8px 8px 1px rgba(0, 0, 0, 0.10)',
                width: '200px',
                height: 'calc(100vh - 60px)',
                zIndex: -100,
                backgroundColor: 'ffffffBF',
                top: '60px',
                left: 0,
            }}
        ></Stack>
    )
}
