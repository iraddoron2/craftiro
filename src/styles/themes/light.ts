import { Theme } from '@/types'
import { colors } from '../colors'

export const lightTheme: Theme = {
    backgrounds: {
        page: colors.brandOrange[190],
        topNavbar: colors.base.white,
        sideNavbar: colors.gray[140],
        miroColors: {
            1: colors.blue.main,
            2: colors.red.main,
            3: colors.green.main,
            4: colors.yellow.main,
            5: colors.purple.main,
            6: colors.orange.main,
        },
        opacityCover: colors.opacityBlack[60],
    },
    text: {
        onPageBackground: colors.base.black,
        onContrastBackground: colors.base.white,
    },
}
