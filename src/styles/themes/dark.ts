import { Theme } from '@/types'
import { colors } from '../colors'

export const darkTheme: Theme = {
    backgrounds: {
        page: colors.gray[20],
        topNavbar: colors.gray[30],
        sideNavbar: colors.gray[40],
        miroColors: {
            1: colors.blue.main,
            2: colors.red.main,
            3: colors.green.main,
            4: colors.yellow.main,
            5: colors.purple.main,
            6: colors.orange.main,
        },
        opacityCover: colors.opacityWhite[170],
    },
    text: {
        onPageBackground: colors.base.white,
        onContrastBackground: colors.base.black, // Light text on dark backgrounds
    },
}
