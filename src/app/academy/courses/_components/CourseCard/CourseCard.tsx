'use client'

import { CraftiroCourse } from '@/types/craftiroCourses'
import { Button, Stack, Text } from '@core'
import Link from 'next/link'

type Props = {
    course: CraftiroCourse
}

export const CourseCard = ({ course }: Props) => {
    const { systemId, name, shortDescription, difficulty, tags } = course

    const getDifficultyLabel = (diff: number) => {
        switch (diff) {
            case 1:
                return 'מתחילים'
            case 2:
                return 'קל'
            case 3:
                return 'בינוני'
            case 4:
                return 'מתקדם'
            case 5:
                return 'מאתגר'
            default:
                return 'לא ידוע'
        }
    }

    return (
        <Stack
            sx={{
                minWidth: 300,
                maxWidth: 380,
                minHeight: 220,
                background: '#fff',
                borderRadius: '18px',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.09)',
                padding: '28px 20px',
                margin: '8px',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                transition: 'box-shadow 0.16s',
                '&:hover': {
                    boxShadow: '0 4px 24px 0 rgba(33,102,199,0.14)',
                },
            }}
        >
            {/* כותרת */}
            <Text
                variant="h3"
                text={name}
                sx={{
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    marginBottom: '10px',
                    color: '#2266C7',
                }}
            />

            {/* תיאור קצר */}
            <Text
                variant="body1"
                text={shortDescription}
                sx={{
                    color: '#333',
                    fontSize: '1.05rem',
                    marginBottom: '16px',
                }}
            />

            {/* מידע משלים: רמת קושי, תגיות, יוצרים */}
            <Stack
                sx={{ flexDirection: 'row', gap: '12px', marginBottom: '16px' }}
            >
                <Text
                    variant="caption"
                    text={`רמה: ${getDifficultyLabel(difficulty)}`}
                    sx={{ color: '#2266C7', fontWeight: 600 }}
                />
                {tags && tags.length > 0 && (
                    <Stack sx={{ flexDirection: 'row', gap: '7px' }}>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    background: '#F2F7FF',
                                    color: '#2266C7',
                                    borderRadius: '7px',
                                    padding: '2px 10px',
                                    fontSize: '0.95em',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </Stack>
                )}
            </Stack>
            <Link href={`/academy/courses/${systemId}`} passHref>
                <Button label="כניסה לקורס" color="primary" />
            </Link>
        </Stack>
    )
}
