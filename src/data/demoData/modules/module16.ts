import { Module } from '@/types/module'

const module16: Module = {
    _id: '16',
    metadata: {
        generalInfo: {
            createdAt: new Date('2023-01-01'),
            version: '0.1.0',
            serialNumber: 16,
            status: 'beta',
            authors: ['עירד דורון'],
        },
        accessControl: {
            isPublic: true,
        },
        contentMetadata: {
            title: 'מבוא לפסנתר',
            categories: ['מוזיקה'],
            tags: ['פסנתר'],
            shortDescription: 'לימוד אלתור עם תבניות ליווי בפסנתר',
            longDescription:
                'מודול זה מיועד למתחילים בלימוד פסנתר. הוא כולל הסברים על אלתור עם תבניות ליווי, תרגילים מעשיים ' +
                'ותרגולים של אלתור עם תבניות ליווי שונות.',
            objectives: [
                'להבין את יסודות האלתור עם תבניות ליווי',
                'ללמוד כיצד להשתמש בתבניות ליווי שונות',
                'לתרגל אלתור עם תבניות ליווי בפסנתר',
            ],
            subjects: ['פסנתר', 'אלתור', 'תבניות ליווי'],
            language: 'עברית',
            betaVersionUrl:
                'https://docs.google.com/document/d/1QPHOEGYCHXSvbbSRAxqcqvUzQVJqw90mxH-yhvKxSTU/edit?usp=drive_link',
        },
    },
}

export { module16 }
