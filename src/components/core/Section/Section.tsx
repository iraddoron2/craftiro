'use client'

import { BoxProps as MuiBoxProps, Box as MuiMaterialBox } from '@mui/material'
import React from 'react'

type SectionProps = MuiBoxProps & {
    children: React.ReactNode
}

export const Section = ({ children, ...props }: SectionProps) => {
    return (
        <MuiMaterialBox component="section" {...props}>
            {children}
        </MuiMaterialBox>
    )
}
