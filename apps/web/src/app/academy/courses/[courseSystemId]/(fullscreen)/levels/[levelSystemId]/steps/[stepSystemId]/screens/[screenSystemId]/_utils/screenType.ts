import type { CraftiroCourseScreenType } from '@/types/craftiroCourses'

export function getScreenTypeChipBackgroundColor(
    screenType: CraftiroCourseScreenType
) {
    switch (screenType) {
        case 'info':
            return 'var(--color-brand-blue-190)'
        case 'exercise':
            return 'var(--color-brand-orange-190)'
        case 'quiz':
            return 'var(--color-purple-190)'
        default:
            return 'var(--color-brand-blue-190)'
    }
}

export function getScreenTypeLabel(screenType: CraftiroCourseScreenType) {
    switch (screenType) {
        case 'info':
            return 'מידע'
        case 'exercise':
            return 'תרגיל'
        case 'quiz':
            return 'מבדק'
        default:
            return 'מידע'
    }
}
