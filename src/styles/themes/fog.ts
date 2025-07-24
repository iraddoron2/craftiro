import { Theme } from '@/types'
import { colors } from '../colors'

export const fogTheme: Theme = {
    backgrounds: {
        page: colors.gray[110],
        topNavbar: colors.brandBlue[100],
        sideNavbar: colors.gray[100],
        miroColors: {
            1: colors.blue.main,
            2: colors.red.main,
            3: colors.green.main,
            4: colors.yellow.main,
            5: colors.purple.main,
            6: colors.orange.main,
        },
        opacityCover: colors.opacityWhite[10],
    },
    text: {
        onPageBackground: colors.base.black,
        onContrastBackground: colors.base.white,
    },
}
