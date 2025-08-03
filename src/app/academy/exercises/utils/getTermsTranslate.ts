export const getTermsTranslate = (term: string): string => {
    const translations: Record<string, string> = {
        'Piano Score Playing': 'נגינת תרשים מוזיקלי בפסנתר',
    }

    const translate = translations[term]

    return translate || term // Return the term itself if no translation is found
}
