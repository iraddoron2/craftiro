'use client'

import { useTabsNavbar } from '@/lib'
import { Stack } from '@core'
import { Divider, TabLink } from './_components'

export const TabsNavbar = () => {
    const { linksGroups, currentPath } = useTabsNavbar()
    return (
        <Stack
            sx={{
                position: 'fixed',
                boxShadow: '0px 8px 8px 1px rgba(0, 0, 0, 0.10)',
                width: '200px',
                height: 'calc(100vh - 60px)',
                backgroundColor: 'ffffffBF',
                top: '60px',
                left: 0,
            }}
        >
            {linksGroups.map((linksGroups, index, arr) => {
                return (
                    <Stack key={index}>
                        {linksGroups.map((linkGroup) => {
                            const { path, label } = linkGroup
                            return (
                                <TabLink
                                    key={path}
                                    path={path}
                                    label={label}
                                    isActive={currentPath === path}
                                />
                            )
                        })}

                        {index < arr.length - 1 && <Divider />}
                    </Stack>
                )
            })}
        </Stack>
    )
}
