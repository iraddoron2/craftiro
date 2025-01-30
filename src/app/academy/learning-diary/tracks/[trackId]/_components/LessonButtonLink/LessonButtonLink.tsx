'use client'

import { MainLinkButton } from '@shared'

type Props = {
    label: string
    path: string
}
export const LessonButtonLink = ({ label, path }: Props) => {
    return <MainLinkButton label={label} path={path} />
}
