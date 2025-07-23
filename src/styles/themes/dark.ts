import { Theme } from '@/types'
import { colors } from '../colors'

export const darkTheme: Theme = {
    backgrounds: {
        page: colors.gray[20], // רקע עמוד אפור כהה
        topNavbar: colors.gray[30], // נבבר עליון כהה
        sideNavbar: colors.gray[40], // נבבר צד כהה יותר
    },
    text: {
        onPageBackground: colors.white, // טקסט לבן על רקע כהה
    },
}
