import { Theme } from '@/types'
import { colors } from '../colors'

export const lightTheme: Theme = {
    backgrounds: {
        page: colors.white,
        topNavbar: colors.white,
        sideNavbar: colors.gray[140],
    },
    text: {
        onPageBackground: colors.black,
    },
}
