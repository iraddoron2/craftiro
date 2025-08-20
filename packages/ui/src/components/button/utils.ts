import type { ButtonSize, ButtonVariant } from './types'

/** גדלים (כמו שהיה) */
export const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    small: { fontSize: 14, padding: '4px 10px' },
    medium: { fontSize: 20, padding: '18px 24px' },
    large: { fontSize: 24, padding: '12px 28px' },
}

type StateKey = 'default' | 'hover' | 'active'
type ButtonColor = 'primary' | 'secondary' | 'default'

/** var(--name) */
const v = (name: string) => `var(--${name})`

/** ממפה prop של הצבע לשם intent בתמה */
function colorToIntent(
    color: ButtonColor
): 'primary' | 'secondary' | 'tertiary' {
    // לעת עתה "default" = "tertiary". כשתוסיף neutral, נשנה כאן ל-"neutral".
    if (color === 'secondary') return 'secondary'
    if (color === 'primary') return 'primary'
    return 'tertiary'
}

/** מחזיר var לשדה intent נתון */
function intentVar(
    intent: string,
    slot: 'main' | 'accent' | 'subtle' | 'onMain' | 'onAccent' | 'onSubtle'
) {
    return v(`color-intent-${intent}-${slot}`)
}

/** מחזיר צבעי רקע/טקסט/מסגרת לפי variant+state, מתוך intent tokens */
export function getButtonStyle(
    color: ButtonColor,
    variant: ButtonVariant,
    state: StateKey
): { background: string; text: string; border: string } {
    const intent = colorToIntent(color)

    if (variant === 'contained') {
        // default → main/onMain, hover/active → accent/onAccent
        const isDefault = state === 'default'
        return {
            background: intentVar(intent, isDefault ? 'main' : 'accent'),
            text: intentVar(intent, isDefault ? 'onMain' : 'onAccent'),
            border: intentVar(intent, isDefault ? 'main' : 'accent'),
        }
    }

    if (variant === 'outlined') {
        if (state === 'default') {
            return {
                background: 'transparent',
                text: intentVar(intent, 'main'),
                border: intentVar(intent, 'main'),
            }
        }
        // hover/active: רקע עדין (subtle), טקסט/מסגרת accent
        return {
            background: intentVar(intent, 'subtle'),
            text: intentVar(intent, 'onSubtle'), // אפשר גם main אם תרצה מראה “קישור”
            border: intentVar(intent, 'accent'),
        }
    }

    // text variant: רקע שקוף, בט:hover/active רקע subtle
    if (variant === 'text') {
        if (state === 'default') {
            return {
                background: 'transparent',
                text: intentVar(intent, 'main'),
                border: 'transparent',
            }
        }
        return {
            background: intentVar(intent, 'subtle'),
            text: intentVar(intent, state === 'hover' ? 'main' : 'accent'),
            border: 'transparent',
        }
    }

    // fallback
    return {
        background: intentVar(intent, 'main'),
        text: intentVar(intent, 'onMain'),
        border: intentVar(intent, 'main'),
    }
}

/** מאפייני מסגרת בסיסיים; עם fallback אם לא הוגדר טוקן */
export function getBorderBasics(variant: ButtonVariant) {
    const base = `button-${variant}`
    const width = `var(--${base}-border-width, 1px)`
    const style = `var(--${base}-border-style, solid)`
    return { width, style }
}
