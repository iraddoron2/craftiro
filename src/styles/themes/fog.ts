import { Theme } from '@/types'
import { colors } from '../colors'

export const fogTheme: Theme = {
    backgrounds: {
        page: colors.gray[110], // רקע עמוד אפור בהיר-כהה
        topNavbar: colors.brandBlue[100], // נבבר עליון כחול עז
        sideNavbar: colors.gray[100], // נבבר צד אפור בינוני
    },
    text: {
        onPageBackground: colors.black, // טקסט כהה על רקע בינוני
    },
}
