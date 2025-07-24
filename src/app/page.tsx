'use client'
// import styles from './page.module.css'

import { Button, Section, Stack, SvgImage, Text } from '@core'
import { useTheme } from '@hooks'
import { useRouter } from 'next/navigation'
import { BoxChip } from './_components'

// import { getSession } from '@/lib/auth'

// const getUserFromDb = async () => {
//     const apiUserCall = `${getBaseDomain()}/api/user`
//     try {
//         const res = await fetch(apiUserCall, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })

//         if (!res.ok) {
//             throw new Error(`Response status: ${res.status}`)
//         }

//         const resData = JSON.stringify(res)
//         console.log('resData', resData)
//         return resData
//     } catch (error) {
//         console.error('Error getting user', error)
//         return NextResponse.redirect(new URL('/sign-in'))
//     }
// }

export default function Home() {
    const theme = useTheme()
    const router = useRouter()

    return (
        <Stack
            direction="column"
            sx={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }}
        >
            <Section
                sx={{
                    minHeight: '100vh',
                    width: '100vw',
                    background: theme.background.page,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stack
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        variant="h1"
                        sx={{
                            color: theme.text.onPageBackground,
                            fontWeight: 'bold',
                        }}
                        text="כל אחד יכול ללמוד מוזיקה "
                    />
                    <Text
                        variant="h2"
                        sx={{
                            color: theme.text.onPageBackground,
                            fontSize: '3rem',
                        }}
                        text=" ללמוד מוזיקה בדרך שמתאימה לכם"
                    />
                </Stack>
                <SvgImage
                    src="svg/Logo For Background.svg"
                    alt="Description of the image"
                    width={500}
                    height={500}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        opacity: 0.14,
                        position: 'absolute',
                        transform: 'translateX(-100%)',
                    }}
                />
                <Stack
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'start',
                        width: '100%',

                        padding: '0px 80px',
                    }}
                >
                    <BoxChip
                        label="נגינת שירים בפסנתר"
                        backgroundColor={theme.background.miroColors[6]}
                        textColor={theme.text.onContrastBackground}
                    />
                    <BoxChip
                        label="תיאוריית המוזיקה"
                        backgroundColor={theme.background.miroColors[3]}
                        textColor={theme.text.onContrastBackground}
                    />
                    <BoxChip
                        label="אלתורים"
                        backgroundColor={theme.background.miroColors[1]}
                        textColor={theme.text.onContrastBackground}
                    />
                    <BoxChip
                        label="הלחנה"
                        backgroundColor={theme.background.miroColors[5]}
                        textColor={theme.text.onContrastBackground}
                    />
                </Stack>
            </Section>
            <Section
                sx={{
                    minHeight: '100vh',
                    width: '100vw',
                    position: 'relative',
                    backgroundImage:
                        'url("/backgrounds/Miro Background 7.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    // מוסיף שכבת overlay:
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: theme.background.opacityCover,
                        backgroundBlendMode: 'darken', // TODO: Not working, need to investigate
                        pointerEvents: 'none',
                        zIndex: 1,
                    },
                }}
            >
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
                            justifyContent: 'space-between',
                        }}
                    >
                        <Stack>
                            <Stack>
                                <Text
                                    variant="h1"
                                    sx={{
                                        color: theme.text.onContrastBackground,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '11rem',
                                    }}
                                    text="אקדמיה"
                                />
                            </Stack>
                            <Stack>
                                <Text
                                    variant="h1"
                                    sx={{
                                        color: theme.text.onContrastBackground,
                                        zIndex: 2,
                                        textAlign: 'center',
                                        fontWeight: 'regular',
                                        fontSize: '2rem',
                                    }}
                                    text="האקדמיה של קראפטירו - למידה שמביאה תוצאות"
                                />
                            </Stack>
                            <Stack
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    label="כניסה לאקדמיה"
                                    color="secondary"
                                    onClick={() => {
                                        router.push('/academy')
                                    }}
                                    style={{
                                        marginTop: '24px',
                                        width: '200px',
                                    }}
                                />
                            </Stack>
                        </Stack>

                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: '24px',
                                justifyContent: 'end',
                                alignItems: 'center',
                                width: '800px',
                            }}
                        >
                            <BoxChip
                                label="קורסים דיגיטליים"
                                backgroundColor={theme.background.miroColors[6]}
                                textColor={theme.text.onContrastBackground}
                            />
                            <BoxChip
                                label="שיעורים פרטיים"
                                backgroundColor={theme.background.miroColors[1]}
                                textColor={theme.text.onContrastBackground}
                            />
                            <BoxChip
                                label="סיכומים"
                                backgroundColor={theme.background.miroColors[2]}
                                textColor={theme.text.onContrastBackground}
                            />
                            <BoxChip
                                label="משחקים"
                                backgroundColor={theme.background.miroColors[4]}
                                textColor={theme.text.onContrastBackground}
                            />
                            <BoxChip
                                label="תרגילים"
                                backgroundColor={theme.background.miroColors[3]}
                                textColor={theme.text.onContrastBackground}
                            />
                            <BoxChip
                                label="אתגרים"
                                backgroundColor={theme.background.miroColors[5]}
                                textColor={theme.text.onContrastBackground}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Section>
        </Stack>
    )
}
