'use client'

import { Section, Stack } from '@core'
import { useRouter } from 'next/navigation'
// import { useTheme } from '@hooks'
import {
    BaseCard,
    BaseCardText,
    FullWidthCard,
    InteractivePaintBlobsBackground,
    MiroButton,
} from '@shared'
import { colors, sizes } from '@styles'

export const Section2 = () => {
    const router = useRouter()
    // const theme = useTheme()

    return (
        <Section
            sx={{
                paddingTop: '200px',
                paddingBottom: '200px',
                minHeight: '100vh',
                width: '100vw',
                position: 'sticky',
                // backgroundImage: 'url("/backgrounds/Miro Background 7.png")',
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                // backgroundRepeat: 'no-repeat',
                backgroundColor: colors.brandBlue[20],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                // overlay:
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    // backgroundColor: theme.background.opacityCover,
                    backgroundBlendMode: 'darken', // TODO: Not working, need to investigate
                    pointerEvents: 'none',
                    zIndex: 1,
                },
            }}
        >
            <InteractivePaintBlobsBackground
                style={{
                    zIndex: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />
            <Stack
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '80px',
                }}
            >
                <Stack
                    sx={{
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'start',
                        gap: '80px',
                        justifyContent: 'space-between',
                        [sizes.breakpoints.down('fullHd')]: {
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}
                >
                    <FullWidthCard
                        sx={{
                            height: '580px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '40px',
                            padding: '32px',
                        }}
                        title="בקרו באקדמיה שלנו"
                        color="orange"
                    >
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '40px',
                            }}
                        >
                            <BaseCard
                                title="מה זאת האקדמיה של קראפטירו?"
                                sx={{
                                    width: '540px',
                                    height: '240px',
                                }}
                            >
                                <BaseCardText text="סביבת למידה דיגיטלית שבה כל אחד יכול ללמוד מוזיקה בקצב שלו, ברמה שלו ובזמן שלו." />
                            </BaseCard>
                            <BaseCard
                                title="איך לומדים באקדמיה?"
                                sx={{
                                    width: '540px',
                                    height: '240px',
                                }}
                            >
                                <BaseCardText text="באקדמיה אפשר ללמוד בעזרת מערכת קורסים דיגיטליים, מערכת תרגילים ומערכת סיכומים. בנוסף אפשר לתאם שיעורים פרטיים לבדיקה וחיזוק הידע." />
                            </BaseCard>
                        </Stack>
                        <MiroButton
                            variant="contained"
                            color="orange"
                            size="large"
                            onClick={() => router.push('/academy')}
                        >
                            כניסה לאקדמיה
                        </MiroButton>
                    </FullWidthCard>
                    <FullWidthCard
                        sx={{
                            height: '580px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '40px',
                            padding: '32px',
                        }}
                        title="שיעורים פרטיים"
                        color="blue"
                    >
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '40px',
                            }}
                        >
                            <BaseCard
                                title="מדריכים פרטיים"
                                sx={{
                                    width: '540px',
                                    height: '240px',
                                }}
                            >
                                <BaseCardText text="תוכלו למצוא כאן מדריכים שיעזרו לכם ללמוד את מה שאתם רוצים. אפשר לתאם שיעורים פרטיים, ליוויים אישיים, ולקבל עזרה בתהליך הלמידה." />
                            </BaseCard>
                            <BaseCard
                                title="מה זה ליווי אישי?"
                                sx={{
                                    width: '540px',
                                    height: '240px',
                                }}
                            >
                                <BaseCardText text="במנוי של ליווי אישי תקבלו מדריך אישי שתוכלו להתייעץ איתו באופן אישי על החומר שאתם לומדים ולקבל ממנו פידבק וחוות דעת על ההתקדמות שלכם." />
                            </BaseCard>
                        </Stack>
                        <MiroButton
                            variant="contained"
                            color="brandBlue"
                            size="large"
                            onClick={() => router.push('/lessons')}
                        >
                            כניסה לשיעורים פרטיים
                        </MiroButton>
                    </FullWidthCard>
                </Stack>
            </Stack>
        </Section>
    )
}
