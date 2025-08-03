import { Theme } from '@/types'
import { colors } from '../colors'

export const fogTheme: Theme = {
    background: {
        page: colors.gray[110],
        topNavbar: colors.brandBlue[100],
        sideNavbar: colors.gray[100],
        card: colors.base.white,
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
    button: {
        primary: {
            contained: {
                default: {
                    background: colors.brandBlue[100],
                    text: colors.base.white,
                    border: colors.brandBlue[120],
                },
                hover: {
                    background: colors.brandBlue[120],
                    text: colors.base.white,
                    border: colors.brandBlue[140],
                },
                active: {
                    background: colors.brandBlue[140],
                    text: colors.base.white,
                    border: colors.brandBlue[160],
                },
            },
            outlined: {
                default: {
                    background: colors.base.white,
                    text: colors.brandBlue[100],
                    border: colors.brandBlue[100],
                },
                hover: {
                    background: colors.base.white,
                    text: colors.brandBlue[120],
                    border: colors.brandBlue[120],
                },
                active: {
                    background: colors.base.white,
                    text: colors.brandBlue[140],
                    border: colors.brandBlue[140],
                },
            },
            text: {
                default: {
                    background: 'transparent',
                    text: colors.brandBlue[100],
                    border: 'transparent',
                },
                hover: {
                    background: 'transparent',
                    text: colors.brandBlue[120],
                    border: 'transparent',
                },
                active: {
                    background: 'transparent',
                    text: colors.brandBlue[140],
                    border: 'transparent',
                },
            },
        },
        secondary: {
            contained: {
                default: {
                    background: colors.base.white,
                    text: colors.base.white,
                    border: colors.base.white,
                },
                hover: {
                    background: colors.base.white,
                    text: colors.base.white,
                    border: colors.base.white,
                },
                active: {
                    background: colors.base.white,
                    text: colors.base.white,
                    border: colors.base.white,
                },
            },
            outlined: {
                default: {
                    background: colors.base.white,
                    text: colors.base.white,
                    border: colors.base.white,
                },
                hover: {
                    background: colors.base.white,
                    text: colors.base.white,
                    border: colors.base.white,
                },
                active: {
                    background: colors.base.white,
                    text: colors.base.white,
                    border: colors.base.white,
                },
            },
            text: {
                default: {
                    background: 'transparent',
                    text: colors.base.white,
                    border: 'transparent',
                },
                hover: {
                    background: 'transparent',
                    text: colors.base.white,
                    border: 'transparent',
                },
                active: {
                    background: 'transparent',
                    text: colors.base.white,
                    border: 'transparent',
                },
            },
        },
    },
    common: {
        border: colors.gray[120],
    },
}
