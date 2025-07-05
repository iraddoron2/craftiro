import { Module } from '@/types/module'

const module1: Module = {
    _id: '1',
    metadata: {
        generalInfo: {
            createdAt: new Date('2023-01-01'),
            version: '0.1.0',
            serialNumber: 1,
            status: 'beta',
            authors: ['עירד דורון'],
        },
        accessControl: {
            isPublic: true,
        },
        contentMetadata: {
            title: 'קריאת תווים ואקורדים בפסנתר למתחילים',
            categories: ['מוזיקה'],
            tags: ['פסנתר'],
            shortDescription: 'לימוד קריאת תווים ואקורדים בפסנתר למתחילים',
            longDescription:
                'מודול זה מיועד למתחילים בלימוד פסנתר. הוא כולל הסברים על קריאת תווים ואקורדים, תרגילים מעשיים ',
            objectives: [
                'להבין את יסודות קריאת התווים',
                'ללמוד כיצד לקרוא אקורדים',
            ],
            subjects: ['פסנתר', 'קריאת תווים', 'אקורדים'],
            language: 'עברית',
            betaVersionUrl:
                'https://docs.google.com/document/d/1SlwB712imrawpj4-bFze-Okqp_CoNzoVO5p5KyXQhWQ/edit?usp=sharing',
        },
    },
}

export { module1 }
