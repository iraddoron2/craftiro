'use client'

import { SystemHomePageFrame, SystemHomePageHeroSection } from '@/components'
import { PagesNavbar } from '@/components/shared'
import { useUserStore } from '@/store/userStore'
import { isAdmin } from '@/utils'

export default function Page() {
    const user = useUserStore((state) => state.user)
    const isUserAdmin = isAdmin(user)

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
                title="אקדמיה"
                subtitle="האקדמיה של קראפטירו - למידה שמביאה תוצאות"
            ></SystemHomePageHeroSection>
        </SystemHomePageFrame>
    )
}
