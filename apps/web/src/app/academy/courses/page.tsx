'use client'

import {
    DataLabels,
    PaintBlobs,
    SystemHomePageFrame,
    SystemHomePageHeroSection,
    MainButton,
} from '@/components'
import { PagesNavbar } from '@/components/shared'
import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { useUserStore } from '@/store/userStore'
import { FONT_SIZES } from '@/styles'
import {
    getCoursesCount,
    getCoursesLearningTime,
    isAdmin,
    timeConvertor,
} from '@/utils'
import { Section, Stack, Text } from '@craftiro/ui'
import { BaseCard } from '@craftiro/ui-composites'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export default function CoursesPage() {
    const router = useRouter()
    const user = useUserStore((state) => state.user)
    const isUserAdmin = isAdmin(user)
    // Pull courses state from Zustand store (separate selectors)
    const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)

    const [coursesCount, coursesLearningTime] = useMemo(() => {
        if (!craftiroCourses || craftiroCourses.length === 0) {
            return [0, -1] // No courses available
        }
        const count = getCoursesCount(craftiroCourses)
        const learningTime = getCoursesLearningTime(craftiroCourses)
        const learningTimeInHours = timeConvertor(
            'hours',
            'seconds',
            learningTime,
            { rounding: 'round', decimals: 2 }
        )
        return [count, learningTimeInHours]
    }, [craftiroCourses])

    const handleNavigate = (tab: 'search' | 'my-courses' | 'statistics') => {
        switch (tab) {
            case 'search':
                router.push('/academy/courses/search')
                break
            case 'my-courses':
                router.push('/academy/courses/my-courses')
                break
            case 'statistics':
                router.push('/academy/courses/stats')
                break
            default:
                break
        }
    }

    return (
        <SystemHomePageFrame>
            <PagesNavbar
                links={
                    isUserAdmin
                        ? [
                              { href: '/academy', label: 'עמוד בית' },
                              { href: '/academy/store', label: 'חנות' },
                              {
                                  href: '/academy/my-learning',
                                  label: 'הלמידה שלי',
                              },
                              { href: '/academy/courses', label: 'קורסים' },
                              { href: '/academy/exercises', label: 'תרגילים' },
                              { href: '/academy/essays', label: 'מאמרים' },
                              { href: '/academy/questions', label: 'שאלות' },
                              { href: '/academy/lessons', label: 'שיעורים' },
                              { href: '/academy/books', label: 'ספרים' },
                              {
                                  href: '/academy/infographics',
                                  label: 'אינפוגרפיקות',
                              },
                              { href: '/academy/feed', label: 'פיד' },
                              { href: '/academy/songs', label: 'שירים' },
                              { href: '/academy/pieces', label: 'יצירות' },

                              { href: '/academy/games', label: 'משחקים' },
                              { href: '/academy/score', label: 'נקודות' },
                              {
                                  href: '/academy/achievements',
                                  label: 'הישגים',
                              },
                              { href: '/academy/skills', label: 'כישורים' },
                              {
                                  href: '/academy/certificates',
                                  label: 'תעודות',
                              },
                              {
                                  href: '/academy/stats',
                                  label: 'סטטיסטיקות',
                              },
                          ]
                        : [
                              { href: '/academy', label: 'עמוד בית' },
                              { href: '/academy/exercises', label: 'תרגילים' },
                          ]
                }
            />
            <SystemHomePageHeroSection
                title="קורסים"
                subtitle="למדו מוזיקה צעד אחר צעד בעזרת הקורסים שלנו"
                fullscreen={false}
                opacity={50}
                contentPosition="center"
            >
                {/* {craftiroCoursesLoading && <div>טוען קורסים...</div>}
            {craftiroCoursesError && <div>שגיאה: {craftiroCoursesError}</div>} */}

                {/* {!craftiroCoursesLoading && !craftiroCoursesError && (
                <Stack
                    style={{
                        width: '100%',
                        maxWidth: '1600px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '40px',
                        flexDirection: 'row',
                    }}
                >
                    {craftiroCourses.map((course) => (
                        <CourseCard key={course.systemId} course={course} />
                    ))}
                </Stack>
            )} */}

                <DataLabels
                    data={[
                        {
                            label: 'קורסים',
                            value: coursesCount,
                        },
                        {
                            label: 'שעות',
                            value: coursesLearningTime,
                        },
                    ]}
                />
            </SystemHomePageHeroSection>
            <Section
                style={{
                    position: 'relative',
                    paddingTop: 200,
                    paddingBottom: 200,
                    minHeight: '100vh',
                    width: 'calc(100vw - 256px)',
                    display: 'flex',
                    marginRight: '256px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    background: 'var(--color-background-contrast)',
                }}
            >
                <PaintBlobs fixedFullScreen={false} />
                <Stack
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '32px',
                    }}
                >
                    <BaseCard
                        title="מה זאת מערכת הקורסים של קראפטירו?"
                        style={{
                            width: 440,
                            maxWidth: '100%',
                            zIndex: 1,
                            fontSize: `${FONT_SIZES.bigRunningText}px`,
                            padding: '18px',
                        }}
                    >
                        <Text
                            as="p"
                            style={{
                                margin: 0,
                                lineHeight: 1.5,
                                textAlign: 'right',
                                fontSize: `${FONT_SIZES.runningText}px`,
                            }}
                        >
                            מערכת קורסים דיגיטליים אינטראקטיביים. בכל קורס יש
                            מגוון תרגילים, סיכומים, סרטונים ודוגמאות.
                        </Text>
                    </BaseCard>
                    <Stack
                        style={{
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '16px',
                        }}
                    >
                        <MainButton
                            label="חיפוש קורסים"
                            onClick={() => handleNavigate('search')}
                            size="large"
                            style={{
                                width: 180,
                            }}
                        />
                    </Stack>
                </Stack>
            </Section>
        </SystemHomePageFrame>
    )
}

// <Button
//                         label="הקורסים שלי"
//                         onClick={() => handleNavigate('my-courses')}
//                     />
//                     <Button
//                         label="סטטיסטיקות"
//                         onClick={() => handleNavigate('statistics')}
//                     />

// type BaseCardProps = {
//     title?: string;
//     children?: React$1.ReactNode;
//     className?: string;
//     style?: React$1.CSSProperties;
//     /** אופציונלי: מצב הרמה – משנה רקע/מסגרת (אם תרצה בעתיד) */
//     elevated?: boolean;
// };
