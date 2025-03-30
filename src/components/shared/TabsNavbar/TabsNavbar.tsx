'use client'

import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { usePathname } from 'next/navigation'
import { Divider, TabLink } from './_components'

type Props = {
    linksGroups: LinksGroups
}
export const TabsNavbar = ({ linksGroups }: Props) => {
    const currentPath = usePathname()

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
            {linksGroups?.map((linksGroup, index, arr) => {
                return (
                    <Stack key={index} className="stack in TabsNavbar">
                        {linksGroup.map((linkGroup) => {
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
