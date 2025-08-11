'use client'

import React from 'react'
import { CoursesGuards } from './_components'

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <CoursesGuards>{children}</CoursesGuards>
}
