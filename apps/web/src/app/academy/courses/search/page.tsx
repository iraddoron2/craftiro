'use client'

import {
    FullWidthCard,
    MainButton,
    SystemHomePageFrame,
    SystemHomePageHeroSection,
} from '@/components'
import { PagesNavbar } from '@/components/shared'
import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { useUserStore } from '@/store/userStore'
import { CraftiroCourse } from '@/types/craftiroCourses'
import { isAdmin } from '@/utils'
import { Section, Stack, Text } from '@craftiro/ui'
import { useRouter } from 'next/navigation'
import { CourseSubNavbar } from '../_components/CourseSubNavbar'

type SearchedCourseCardProps = {
    course: CraftiroCourse
}

const SearchedCourseCard = ({ course }: SearchedCourseCardProps) => {
    const router = useRouter()
    const { name, shortDescription, tags } = course
    const handleNavigateToCourse = (courseId: string) => {
        router.push(`/academy/courses/${courseId}`)
    }

    return (
        <Stack
            style={{
                backgroundColor: 'var(--color-text-on-contrast-background)',
                width: '420px',
                height: '240px',
                borderRadius: '12px',
                border: 'solid 2px var(--color-divider-main)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                boxSizing: 'border-box',
                gap: '8px',
            }}
        >
            <Stack>
                <Text
                    style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        textAlign: 'center',
                        marginBottom: '8px',
                    }}
                >
                    {name}
                </Text>
                <Text
                    style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: 'var(--color-text-secondary)',
                        textAlign: 'center',
                        marginBottom: '16px',
                    }}
                >
                    {shortDescription}
                </Text>
                <Stack
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '16px',
                    }}
                >
                    {tags.map((tag) => {
                        return (
                            <Text
                                key={tag}
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: 'var(--color-base-black)',
                                    backgroundColor:
                                        'var(--color-brand-blue-lightest)',
                                    borderRadius: '8px',
                                    padding: '4px 8px',
                                    display: 'inline-block',
                                    margin: '0 4px',
                                    width: 'fit-content',
                                }}
                            >
                                {tag}
                            </Text>
                        )
                    })}
                </Stack>
            </Stack>
            <Stack
                style={{
                    width: '100%',
                }}
            >
                <MainButton
                    label="כניסה לקורס"
                    onClick={() => handleNavigateToCourse(course._id)}
                    color="brand-blue"
                />
            </Stack>
        </Stack>
    )
}

export default function Page() {
    const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const user = useUserStore((state) => state.user)
    const isUserAdmin = isAdmin(user)

    return (
        <SystemHomePageFrame>
            <SystemHomePageHeroSection
                title={null}
                subtitle={null}
                style={{
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '100%',
                    height: '100%',
                }}
            >
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
                                  {
                                      href: '/academy/exercises',
                                      label: 'תרגילים',
                                  },
                                  { href: '/academy/essays', label: 'מאמרים' },
                                  {
                                      href: '/academy/questions',
                                      label: 'שאלות',
                                  },
                                  {
                                      href: '/academy/lessons',
                                      label: 'שיעורים',
                                  },
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
                                  {
                                      href: '/academy/exercises',
                                      label: 'תרגילים',
                                  },
                              ]
                    }
                />
                <FullWidthCard
                    title="חיפוש קורסים"
                    color="orange"
                    style={{ margin: '24px', width: 'calc(100% - 48px)' }}
                />

                <CourseSubNavbar />
                <Section>
                    <Stack
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '16px',
                            flexWrap: 'wrap',
                            width: '100%',
                        }}
                    >
                        {craftiroCourses.map((course) => {
                            return (
                                <SearchedCourseCard
                                    key={course._id}
                                    course={course}
                                />
                            )
                        })}
                    </Stack>
                </Section>
            </SystemHomePageHeroSection>
        </SystemHomePageFrame>
    )
}
