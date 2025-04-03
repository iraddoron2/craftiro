import { Module } from '@/types/module'

export const module1: Module = {
    _id: '1',
    metadata: {
        generalInfo: {
            createdAt: new Date('2025-04-02T10:00:00Z'),
            updatedAt: new Date('2025-04-10T12:00:00Z'),
            version: '1.0.0',
            serialNumber: 1001,
            status: 'published',
            authors: ['יוסי כהן', 'דנה לוי'],
            contributors: ['אבי מרקוביץ'],
        },
        analyticsData: {
            views: 5200,
            completions: 3400,
            averageCompletionTime: 1800,
            rating: 4,
            feedbackCount: 120,
            dropoffRate: 12.5,
        },
        accessControl: {
            isPublic: true,
            requiredSubscription: 'free',
            accessLogs: [
                {
                    userId: 'user_123',
                    accessedAt: new Date('2025-04-05T14:30:00Z'),
                },
                {
                    userId: 'user_456',
                    accessedAt: new Date('2025-04-06T09:15:00Z'),
                },
            ],
        },
        contentMetadata: {
            title: 'מבוא ל-JavaScript',
            categories: ['תכנות', 'JavaScript'],
            tags: ['תכנות', 'JS', 'פונקציות', 'משתנים'],
            prerequisites: [],
            shortDescription: 'קורס בסיסי להבנת השפה הפופולרית JavaScript',
            longDescription:
                'מודול זה יכיר לכם את עקרונות השפה JavaScript, כולל משתנים, פונקציות, ואינטראקציה עם הדפדפן.',
            objectives: [
                'להבין את מושגי היסוד של JavaScript',
                'ללמוד כיצד להגדיר משתנים',
                'להכיר את מבני הבקרה של השפה',
            ],
            subjects: ['JavaScript'],
            estimatedCompletionTime: 3600,
            language: 'Hebrew',
        },
        engagement: {
            likes: 430,
            favorites: 120,
            shares: 55,
            comments: [],
            discussions: [],
            reactions: [],
            userProgressStats: {
                totalEnrolled: 1500,
                activeUsers: 870,
                averageCompletionTime: 3200,
                highestRatedUnit: 'unit_001',
            },
            leaderboard: [],
        },
        evolution: {
            featureRequests: ['להוסיף קטעי קוד לתרגול'],
            improvementSuggestions: ['להרחיב את ההסברים על פונקציות'],
            bugReports: [],
        },
    },
    units: [
        {
            _id: 'unit_001',
            metadata: {
                generalInfo: {
                    createdAt: new Date('2025-04-02T12:00:00Z'),
                    updatedAt: new Date('2025-04-09T08:30:00Z'),
                    status: 'published',
                    authors: ['יוסי כהן'],
                },
                analyticsData: {
                    views: 3000,
                    completions: 2000,
                    averageCompletionTime: 1200,
                    rating: 5,
                    feedbackCount: 50,
                    dropoffRate: 8.2,
                },
                accessControl: {
                    isPublic: true,
                    requiredSubscription: 'free',
                    accessLogs: [],
                },
                contentMetadata: {
                    title: 'משתנים, טיפוסים ופקודות בסיסיות',
                    categories: ['תכנות'],
                    tags: ['משתנים', 'טיפוסים'],
                    shortDescription:
                        'יחידה זו תציג את עקרונות המשתנים ב-JavaScript.',
                    longDescription:
                        'לימוד מושגי המשתנים ב-JavaScript, סוגי נתונים עיקריים ושימושים נפוצים.',
                    objectives: ['להבין משתנים', 'להכיר טיפוסים'],
                    subjects: ['JavaScript'],
                    estimatedCompletionTime: 1200,
                },
                engagement: {
                    likes: 120,
                    favorites: 40,
                    shares: 20,
                    comments: [],
                },
                evolution: {
                    featureRequests: [],
                    improvementSuggestions: [],
                    bugReports: [],
                },
            },
            levels: [
                {
                    _id: 'level_001',
                    metadata: {
                        generalInfo: {
                            createdAt: new Date('2025-04-02T10:00:00Z'),
                            updatedAt: new Date('2025-04-05T12:30:00Z'),
                            status: 'published',
                            authors: ['יוסי כהן', 'דנה לוי'],
                            contributors: ['אבי מרקוביץ'],
                        },
                        analyticsData: {
                            views: 3200,
                            completions: 2100,
                            averageCompletionTime: 1800,
                            rating: 4,
                            feedbackCount: 95,
                            dropoffRate: 10.5,
                        },
                        accessControl: {
                            isPublic: true,
                            requiredSubscription: 'free',
                            accessLogs: [
                                {
                                    userId: 'user_123',
                                    accessedAt: new Date(
                                        '2025-04-03T15:45:00Z'
                                    ),
                                },
                                {
                                    userId: 'user_456',
                                    accessedAt: new Date(
                                        '2025-04-04T09:10:00Z'
                                    ),
                                },
                            ],
                        },
                        contentMetadata: {
                            title: 'מבוא לפונקציות',
                            categories: ['JavaScript', 'תכנות'],
                            tags: ['פונקציות', 'JavaScript', 'קוד'],
                            shortDescription:
                                'הבנה בסיסית של פונקציות וכיצד להגדיר אותן ב-JavaScript.',
                            longDescription:
                                'בשלב זה נלמד מהן פונקציות, כיצד הן פועלות, למה הן חשובות, וכיצד ניתן להשתמש בהן בקוד JavaScript שלנו.',
                            objectives: [
                                'להבין את הרעיון של פונקציות',
                                'להכיר את התחביר להגדרת פונקציות',
                                'להבין כיצד פונקציות מחזירות ערכים',
                            ],
                            subjects: ['JavaScript'],
                            estimatedCompletionTime: 2400,
                        },
                        engagement: {
                            likes: 260,
                            favorites: 85,
                            shares: 40,
                            comments: [
                                {
                                    userId: 'user_789',
                                    username: 'נועם לוי',
                                    timestamp: new Date('2025-04-06T14:20:00Z'),
                                    text: 'תוכן מעולה! סוף סוף הבנתי איך פונקציות באמת עובדות.',
                                    likes: 12,
                                    replies: [
                                        {
                                            userId: 'user_456',
                                            username: 'אייל כהן',
                                            timestamp: new Date(
                                                '2025-04-06T16:00:00Z'
                                            ),
                                            text: 'מסכים, אבל כדאי היה להוסיף דוגמאות מתקדמות יותר.',
                                            likes: 5,
                                        },
                                    ],
                                },
                            ],
                            discussions: [
                                {
                                    topic: 'למה להשתמש בפונקציות?',
                                    participants: ['user_123', 'user_789'],
                                    messages: [
                                        {
                                            sender: 'user_123',
                                            timestamp: new Date(
                                                '2025-04-07T09:15:00Z'
                                            ),
                                            text: 'האם פונקציות באמת משפרות קריאות קוד?',
                                            attachments: [],
                                        },
                                        {
                                            sender: 'user_789',
                                            timestamp: new Date(
                                                '2025-04-07T10:00:00Z'
                                            ),
                                            text: 'לגמרי, הן מאפשרות לנו להשתמש באותו קטע קוד שוב ושוב.',
                                            attachments: [],
                                        },
                                    ],
                                },
                            ],
                            reactions: [
                                {
                                    userId: 'user_111',
                                    type: 'like',
                                    timestamp: new Date('2025-04-07T12:45:00Z'),
                                },
                                {
                                    userId: 'user_222',
                                    type: 'insightful',
                                    timestamp: new Date('2025-04-08T08:30:00Z'),
                                },
                            ],
                            userProgressStats: {
                                totalEnrolled: 800,
                                activeUsers: 450,
                                averageCompletionTime: 2200,
                            },
                        },
                        evolution: {
                            featureRequests: ['להוסיף הסבר על פונקציות חץ'],
                            improvementSuggestions: [
                                'להרחיב על פרמטרים וארגומנטים',
                            ],
                            bugReports: [
                                {
                                    issue: 'דוגמת הקוד לא עובדת בדפדפנים ישנים',
                                    reportedBy: 'user_333',
                                    status: 'in_progress',
                                    createdAt: new Date('2025-04-09T13:00:00Z'),
                                },
                            ],
                        },
                    },
                    steps: [
                        {
                            _id: 'step_001',
                            metadata: {
                                generalInfo: {
                                    createdAt: new Date('2025-04-02T10:30:00Z'),
                                    updatedAt: new Date('2025-04-04T14:45:00Z'),
                                    status: 'published',
                                    authors: ['יוסי כהן'],
                                    contributors: ['דנה לוי'],
                                },
                                analyticsData: {
                                    views: 1500,
                                    completions: 900,
                                    averageCompletionTime: 600,
                                    rating: 4,
                                    feedbackCount: 45,
                                    dropoffRate: 12.3,
                                },
                                accessControl: {
                                    isPublic: true,
                                    allowedUsers: ['user_101', 'user_202'],
                                    requiredSubscription: 'free',
                                    accessLogs: [
                                        {
                                            userId: 'user_303',
                                            accessedAt: new Date(
                                                '2025-04-03T16:20:00Z'
                                            ),
                                        },
                                        {
                                            userId: 'user_404',
                                            accessedAt: new Date(
                                                '2025-04-04T10:05:00Z'
                                            ),
                                        },
                                    ],
                                },
                                contentMetadata: {
                                    title: 'מהי פונקציה ב-JavaScript?',
                                    shortDescription:
                                        'בשלב זה נלמד מהן פונקציות ואיך הן פועלות בקוד JavaScript.',
                                    estimatedCompletionTime: 900,
                                },
                                engagement: {
                                    likes: 120,
                                    favorites: 60,
                                    shares: 25,
                                    comments: [
                                        {
                                            userId: 'user_505',
                                            username: 'אורן מזרחי',
                                            timestamp: new Date(
                                                '2025-04-06T11:15:00Z'
                                            ),
                                            text: 'סוף סוף הבנתי למה צריך פונקציות, תודה!',
                                            likes: 8,
                                            replies: [
                                                {
                                                    userId: 'user_606',
                                                    username: 'שירה כהן',
                                                    timestamp: new Date(
                                                        '2025-04-06T12:30:00Z'
                                                    ),
                                                    text: 'מסכימה איתך, ההסבר היה ממש ברור!',
                                                    likes: 4,
                                                },
                                            ],
                                        },
                                    ],
                                    discussions: [
                                        {
                                            topic: 'מה היתרונות של שימוש בפונקציות?',
                                            participants: [
                                                'user_101',
                                                'user_202',
                                                'user_505',
                                            ],
                                            messages: [
                                                {
                                                    sender: 'user_101',
                                                    timestamp: new Date(
                                                        '2025-04-07T14:00:00Z'
                                                    ),
                                                    text: 'האם פונקציות באמת עוזרות לקרוא קוד בצורה טובה יותר?',
                                                    attachments: [],
                                                },
                                                {
                                                    sender: 'user_202',
                                                    timestamp: new Date(
                                                        '2025-04-07T15:10:00Z'
                                                    ),
                                                    text: 'כן, הן מאפשרות לנו לחלק את הקוד לחלקים נפרדים שקל להבין ולתחזק.',
                                                    attachments: [],
                                                },
                                            ],
                                        },
                                    ],
                                    reactions: [
                                        {
                                            userId: 'user_707',
                                            type: 'like',
                                            timestamp: new Date(
                                                '2025-04-08T09:50:00Z'
                                            ),
                                        },
                                        {
                                            userId: 'user_808',
                                            type: 'insightful',
                                            timestamp: new Date(
                                                '2025-04-08T11:30:00Z'
                                            ),
                                        },
                                    ],
                                    userProgressStats: {
                                        totalEnrolled: 500,
                                        activeUsers: 320,
                                        averageCompletionTime: 780,
                                    },
                                },
                                evolution: {
                                    featureRequests: [
                                        'להוסיף תרגול אינטראקטיבי',
                                    ],
                                    improvementSuggestions: [
                                        'להרחיב על פונקציות אנונימיות',
                                    ],
                                    bugReports: [
                                        {
                                            issue: 'הדוגמה עם return לא עובדת כמו שצריך',
                                            reportedBy: 'user_909',
                                            status: 'open',
                                            createdAt: new Date(
                                                '2025-04-09T18:00:00Z'
                                            ),
                                        },
                                    ],
                                },
                            },
                            content: [
                                {
                                    type: 'paragraph',
                                    content:
                                        'פונקציות הן חלק מרכזי ב-JavaScript ומאפשרות לנו לארגן קוד בצורה ברורה וניתנת לשימוש חוזר.',
                                },
                                {
                                    type: 'image',
                                    src: 'https://example.com/js-function-diagram.png',
                                    alt: 'תרשים של מבנה פונקציה ב-JavaScript',
                                },
                                {
                                    type: 'paragraph',
                                    content:
                                        'באמצעות פונקציות ניתן לפשט את הקוד, להפוך אותו לקריא יותר ולמנוע חזרות מיותרות.',
                                },
                                {
                                    type: 'paragraph',
                                    content:
                                        'הנה דוגמה לפונקציה בסיסית שמחשבת סכום של שני מספרים:',
                                },
                                {
                                    type: 'image',
                                    src: 'https://example.com/js-function-example.png',
                                    alt: 'דוגמה לקוד פונקציה שמחזירה סכום של שני מספרים',
                                },
                                {
                                    type: 'paragraph',
                                    content:
                                        'כדי להשתמש בפונקציה הזו, פשוט נוכל לקרוא לה עם שני מספרים כארגומנטים, והיא תחזיר את הסכום שלהם.',
                                },
                            ],
                            questions: [
                                {
                                    _id: 'q1',
                                    questionType: 'multiple-choice',
                                    questionDescription:
                                        'מהו הערך המוחזר על ידי הפונקציה הבאה: function sum(a, b) { return a + b; } כאשר נקרא לה עם sum(2, 3)?',
                                    questionData: {
                                        questionType: 'multiple-choice',
                                        questionDescription:
                                            'מהו הערך המוחזר על ידי הפונקציה הבאה: function sum(a, b) { return a + b; } כאשר נקרא לה עם sum(2, 3)?',
                                        questionData: {
                                            options: [
                                                {
                                                    option: '5',
                                                    isCorrect: true,
                                                },
                                                {
                                                    option: '23',
                                                    isCorrect: false,
                                                },
                                                {
                                                    option: 'undefined',
                                                    isCorrect: false,
                                                },
                                                {
                                                    option: 'NaN',
                                                    isCorrect: false,
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    _id: 'q2',
                                    questionType: 'open-ended',
                                    questionDescription:
                                        'מה תהיה תוצאת הקריאה לפונקציה הבאה: function multiply(a, b = 2) { return a * b; } כאשר נקרא לה עם multiply(4)?',
                                    questionData: {
                                        questionType: 'open-ended',
                                        questionDescription:
                                            'מה תהיה תוצאת הקריאה לפונקציה הבאה: function multiply(a, b = 2) { return a * b; } כאשר נקרא לה עם multiply(4)?',
                                        questionData: {
                                            correctAnswer: '8',
                                        },
                                    },
                                },
                                {
                                    _id: 'q3',
                                    questionType: 'multiple-choice',
                                    questionDescription:
                                        'איזה מבין האפשרויות הבאות היא דרך נכונה להגדיר פונקציה ב-JavaScript?',
                                    questionData: {
                                        questionType: 'multiple-choice',
                                        questionDescription:
                                            'איזה מבין האפשרויות הבאות היא דרך נכונה להגדיר פונקציה ב-JavaScript?',
                                        questionData: {
                                            options: [
                                                {
                                                    option: 'function myFunc() {}',
                                                    isCorrect: true,
                                                },
                                                {
                                                    option: 'let myFunc = function() {}',
                                                    isCorrect: true,
                                                },
                                                {
                                                    option: 'const myFunc = () => {}',
                                                    isCorrect: true,
                                                },
                                                {
                                                    option: 'define function myFunc() {}',
                                                    isCorrect: false,
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                            exercises: [
                                {
                                    _id: 'ex1',
                                    exerciseType: 'instructions',
                                    exerciseData: {
                                        exerciseType: 'instructions',
                                        description:
                                            'כתוב פונקציה ב-JavaScript שמקבלת שני מספרים ומחזירה את סכומם.',
                                        instructions: [
                                            'צור פונקציה בשם sum.',
                                            'הפונקציה תקבל שני ארגומנטים: a ו-b.',
                                            'הפונקציה תחזיר את סכומם של a ו-b.',
                                            'בדוק את הפונקציה על ידי קריאה אליה עם מספרים שונים.',
                                        ],
                                    },
                                },
                                {
                                    _id: 'ex2',
                                    exerciseType: 'paragraph',
                                    exerciseData: {
                                        exerciseType: 'paragraph',
                                        paragraphs: [
                                            'בתרגיל זה תתבקש לכתוב פונקציה ב-JavaScript שמחשבת את סכום כל המספרים במערך.',
                                            'חשוב לוודא שהפונקציה מתמודדת גם עם מערך ריק ומחזירה 0 במקרה כזה.',
                                            'כמו כן, יש לבדוק שהתוצאה תקינה על ידי שימוש במערכים שונים.',
                                        ],
                                    },
                                },
                                {
                                    _id: 'ex3',
                                    exerciseType: 'instructions',
                                    exerciseData: {
                                        exerciseType: 'instructions',
                                        description:
                                            'כתוב פונקציה ב-JavaScript שמחזירה את המספר הגדול ביותר במערך נתון.',
                                        instructions: [
                                            'צור פונקציה בשם findMax.',
                                            'הפונקציה תקבל מערך של מספרים.',
                                            'הפונקציה תחזיר את המספר הגדול ביותר במערך.',
                                            'אם המערך ריק, החזר null.',
                                            'בדוק את הפונקציה עם מספר מערכים שונים.',
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
