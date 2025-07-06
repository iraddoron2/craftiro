import { Module } from '@/types/module'

const module4: Module = {
    _id: '4',
    metadata: {
        generalInfo: {
            createdAt: new Date('2023-01-01'),
            version: '0.1.0',
            serialNumber: 4,
            status: 'beta',
            authors: ['עירד דורון'],
        },
        accessControl: {
            isPublic: true,
        },
        contentMetadata: {
            title: 'נגינה בפסנתר בעזרת תבניות ליווי',
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
                'https://docs.google.com/document/d/1FrJIKx3cdZUeOtcLePad0IofY-XSm1t43rxYrNSzTW4/edit?usp=sharing',
        },
    },
}

export { module4 }
