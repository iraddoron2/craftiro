export type AchievementType =
    | 'milestone' // אבן דרך
    | 'streak' // רצף (פעילות רצופה)
    | 'challenge' // אתגר (משימה תחומה בזמן/במטרה)
    | 'skillMastery' // שליטה בכישור
    | 'breadth' // גיוון (פעילות במגוון תחומים)
    | 'social' // הישג חברתי/קהילתי
    | 'hidden' // הישג סודי/הפתעה
    | 'custom' // הישג מיוחד שהוגדר ידנית

export type AchievementStatus = 'locked' | 'unlocked' | 'claimed'

export type AchievementEvaluation = 'instructor' | 'self' | 'system'

export type Achievement = {
    systemId: string // מזהה ייחודי (UUID או מזהה מספרי)
    name: string // שם ההישג (למשל: "שליטה בסולם דו מז׳ור")
    description: string // תיאור ההישג ומה נדרש כדי להשיג אותו
    type: AchievementType // סוג ההישג (אבן דרך, רצף, שליטה וכו')
    iconUrl?: string // קישור לאייקון או תמונה מייצגת
    xpReward?: number // כמות נקודות XP שמקבלים על השגת ההישג
    skillXpReward?: { [skillId: string]: number } // מענק XP ספציפי לכישורים, אם רלוונטי
    criteria: AchievementCriteria // תנאי השגת ההישג (ראה פירוט בהמשך)
    status?: AchievementStatus // סטטוס למשתמש: נעול / הושג / נלקח
    dateAchieved?: string // תאריך השגת ההישג (ISO string)
    hidden?: boolean // האם ההישג סודי (לא מוצג למשתמש עד שמושג)
    rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' // נדירות
    order?: number // סדר הופעה ברשימה
}

// תנאי קבלת ההישג (אפשר להרחיב בקלות לפי הצורך)
export type AchievementCriteria =
    | { type: 'xp'; amount: number } // נצברו X נקודות XP
    | { type: 'streak'; days: number } // X ימים/שבועות/חודשים ברצף
    | { type: 'skill_mastery'; skillId: string; level: number } // רמה בכישור מסוים
    | { type: 'complete_exercise'; exerciseId: string } // סיום תרגיל מסוים
    | { type: 'complete_category'; category: string; amount: number } // השלמת Y תרגילים בקטגוריה
    | { type: 'challenge'; challengeId: string } // השתתפות/הצלחה באתגר מסוים
    | { type: 'community'; action: 'help' | 'invite' | 'forum'; amount: number } // פעולה קהילתית
    | { type: 'custom'; condition: string } // תנאי ידני
