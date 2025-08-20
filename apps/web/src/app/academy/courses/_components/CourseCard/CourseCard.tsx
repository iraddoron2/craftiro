'use client'

import { CraftiroAssetImage } from '@/components'
import { CraftiroCourse } from '@/types/craftiroCourses'
import { Button, Stack, Text } from '@craftiro/ui'
import Link from 'next/link'

type Props = {
    course: CraftiroCourse
}

/** Map numeric difficulty to a human-readable label */
// const getDifficultyLabel = (diff: number) => {
//     switch (diff) {
//         case 1:
//             return 'מתחילים'
//         case 2:
//             return 'קל'
//         case 3:
//             return 'בינוני'
//         case 4:
//             return 'מתקדם'
//         case 5:
//             return 'מאתגר'
//         default:
//             return 'לא ידוע'
//     }
// }

/** Resolve the relative path to the course thumbnail under /api/assets */
const getThumbRelativePath = (course: CraftiroCourse) =>
    course.thumbRelativePath ?? `courses/${course.systemId}/thumb.png`

export const CourseCard = ({ course }: Props) => {
    const { systemId, name, shortDescription, tags } = course

    return (
        <Stack
            style={{
                minWidth: 300,
                maxWidth: 380,
                minHeight: 220,
                background: '#fff',
                borderRadius: '18px',
                borderColor: 'var(--color-divider-main)',
                borderWidth: '2px',
                borderStyle: 'solid',
                overflow: 'hidden',
                margin: '8px',
                transition: 'transform 0.2s ease-in-out',
            }}
        >
            {/* Top thumbnail (auto-fallback handled internally) */}
            <CraftiroAssetImage
                relativePath={getThumbRelativePath(course)}
                alt={name}
                width={640}
                height={360}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                fallbackSrc="/images/fallbacks/course-thumb.png"
            />

            {/* Content */}
            <Stack
                style={{
                    padding: '16px 16px 20px',
                    gap: '24px',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Title */}
                <Text
                    variant="h3"
                    style={{
                        color: 'var(--color-text-on-background)',
                        textAlign: 'center',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: 'normal',
                        width: '100%',
                    }}
                >
                    {name}
                </Text>

                {/* Short description */}
                {!!shortDescription && (
                    <Text
                        variant="body"
                        style={{
                            color: 'var(--color-text-on-background)',
                            textAlign: 'center',
                            fontSize: '16px',
                            lineHeight: '1.5',
                            fontWeight: 300,
                            width: '100%',
                        }}
                    >
                        {shortDescription}
                    </Text>
                )}

                {/* Meta: difficulty + tags */}
                <Stack
                    style={{
                        flexDirection: 'row',
                        gap: '12px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    {/* <Text
                        variant="caption"
                        text={`רמה: ${getDifficultyLabel(difficulty)}`}
                        style={{ color: '#2266C7', fontWeight: 600 }}
                    /> */}
                    {Array.isArray(tags) && tags.length > 0 && (
                        <Stack
                            style={{
                                flexDirection: 'row',
                                gap: '7px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        background: '#F2F7FF',
                                        color: '#2266C7',
                                        borderRadius: '7px',
                                        padding: '2px 10px',
                                        fontSize: '0.95em',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </Stack>
                    )}
                </Stack>

                {/* CTA */}
                <Link
                    href={`/academy/courses/${systemId}/intro`}
                    style={{
                        width: '100%',
                        textDecoration: 'none',
                    }}
                >
                    <Button
                        label="כניסה לקורס"
                        color="primary"
                        style={{
                            width: '100%',
                        }}
                    />
                </Link>
            </Stack>
        </Stack>
    )
}
