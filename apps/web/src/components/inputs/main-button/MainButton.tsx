import clsx from 'clsx'
import React from 'react'

type ButtonVisualState = 'default' | 'hover' | 'active' | 'disabled'
type ButtonVariant = 'contained' | 'outlined' | 'text'
type ButtonSize = 'small' | 'medium' | 'large'

export type MainButtonProps = {
    /** טקסט/תוכן הכפתור */
    label: React.ReactNode
    /** פעולה בלחיצה */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    /** שם קלאס נוסף */
    className?: string
    /** צבע: מחרוזת (hex/rgb/var) או מפתח מהפלטה */
    color?: ColorKey | (string & {})
    /** גודל */
    size?: ButtonSize
    /** מצב מבוקר (אם לא מוסרים – יתנהג לפי hover/active/disabled פנימי) */
    state?: ButtonVisualState
    /** סגנון: contained / outlined / text */
    variant?: ButtonVariant
    /** עובר כ־style inline ונכנס אחרון (מנצח) */
    style?: React.CSSProperties
    /** type לכפתור אמיתי */
    type?: 'button' | 'submit' | 'reset'
}

// טיפוס בסיסי לצבע
type ColorDef = {
    main: string
    mainContrast: string
    hover?: string
    hoverContrast?: string
    border?: string
}

// פלטה עם מפתחות קשיחים
const PALETTE = {
    'brand-blue': {
        main: 'var(--color-brand-blue-main)',
        mainContrast: 'var(--color-base-white)',
        hover: 'var(--color-brand-blue-dark)',
        hoverContrast: 'var(--color-base-white)',
    },
    orange: {
        main: 'var(--color-brand-orange-main)',
        mainContrast: 'var(--color-base-white)',
        hover: 'var(--color-brand-orange-light)',
        hoverContrast: 'var(--color-base-white)',
    },
} as const satisfies Record<string, ColorDef>

// מפתחות חוקיים של הפלטה
type ColorKey = keyof typeof PALETTE

// Type guard – בודק אם מחרוזת היא מפתח חוקי בפלטה
function isColorKey(x: string): x is ColorKey {
    return x in PALETTE
}

// חשוב: טיפוס החזרה מפורש → תמיד ColorDef, לעולם לא undefined
function resolveColor(color?: ColorKey | (string & {})): ColorDef {
    if (!color) return PALETTE['brand-blue'] // ברירת מחדל
    if (isColorKey(color)) return PALETTE[color]
    // צבע חופשי
    return { main: String(color), mainContrast: '#fff', border: String(color) }
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    small: {
        paddingInline: 12,
        paddingBlock: 6,
        fontSize: 14,
        lineHeight: 1.2,
    },
    medium: {
        paddingInline: 16,
        paddingBlock: 10,
        fontSize: 16,
        lineHeight: 1.2,
    },
    large: {
        paddingInline: 20,
        paddingBlock: 12,
        fontSize: 18,
        lineHeight: 1.2,
    },
}

function getVariantStyles(
    variant: ButtonVariant,
    state: ButtonVisualState,
    color: 'brand-blue' | 'brand-orange' | (string & {}),
    colorDef: {
        main: string
        mainContrast: string
        hover?: string
        hoverContrast?: string
        border?: string
    }
): React.CSSProperties {
    const c = colorDef
    const baseTransition =
        'background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s'

    const states = {
        contained: {
            default: {
                background: c.main,
                color: c.mainContrast,
                borderColor: c.main,
                boxShadow: `0 4px 0px 0 var(--color-${color}-dark)`,
            },
            hover: {
                background: c.hover || c.main,
                color: c.hoverContrast,
                borderColor: c.main,
                boxShadow: `0 4px 0px 0 var(--color-${color}-dark)`,
            },
            active: {
                background: 'rgba(0,0,0,0.12)',
                color: c.mainContrast,
                borderColor: c.main,
                boxShadow: 'inset 0 0 0 999px rgba(0,0,0,0.08)',
            },
            disabled: {
                background: 'rgba(0,0,0,0.08)',
                color: 'rgba(0,0,0,0.3)',
                borderColor: 'transparent',
            },
        },
        outlined: {
            default: {
                background: 'transparent',
                color: c.main,
                borderColor: c.border ?? c.main,
            },
            hover: {
                background: 'rgba(0,0,0,0.04)',
                color: c.main,
                borderColor: c.border ?? c.main,
            },
            active: {
                background: 'rgba(0,0,0,0.08)',
                color: c.main,
                borderColor: c.border ?? c.main,
            },
            disabled: {
                background: 'transparent',
                color: 'rgba(0,0,0,0.3)',
                borderColor: 'rgba(0,0,0,0.2)',
            },
        },
        text: {
            default: {
                background: 'transparent',
                color: c.main,
                borderColor: 'transparent',
            },
            hover: {
                background: 'rgba(0,0,0,0.04)',
                color: c.main,
                borderColor: 'transparent',
            },
            active: {
                background: 'rgba(0,0,0,0.08)',
                color: c.main,
                borderColor: 'transparent',
            },
            disabled: {
                background: 'transparent',
                color: 'rgba(0,0,0,0.3)',
                borderColor: 'transparent',
            },
        },
    } as const

    return { ...states[variant][state], transition: baseTransition }
}

export const MainButton: React.FC<MainButtonProps> = ({
    label,
    onClick,
    className,
    color = 'brand-blue',
    size = 'medium',
    state, // אם לא סופק – פנימי ינהל
    variant = 'contained',
    style,
    type = 'button',
}) => {
    const [internalState, setInternalState] =
        React.useState<ButtonVisualState>('default')
    const isControlled = state !== undefined
    const vis: ButtonVisualState = isControlled ? state! : internalState
    const disabled = vis === 'disabled'

    const c = resolveColor(color)
    const base: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderStyle:
            variant === 'contained' || variant === 'text' ? 'none' : 'solid',
        borderWidth: variant === 'text' ? 0 : 1,
        fontFamily: 'inherit',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        gap: 8,
        ...sizeStyles[size],
    }

    const variantStyle = getVariantStyles(variant, vis, color, c)

    const merged: React.CSSProperties = { ...base, ...variantStyle, ...style }

    // Handlers (פועלים רק אם לא מבוקר)
    const setVis = (s: ButtonVisualState) => {
        if (!isControlled) setInternalState(s)
    }

    return (
        <button
            type={type}
            className={clsx('main-button', className)}
            style={merged}
            onClick={disabled ? undefined : onClick}
            aria-disabled={disabled || undefined}
            onMouseEnter={() => setVis('hover')}
            onMouseLeave={() => setVis('default')}
            onMouseDown={() => setVis('active')}
            onMouseUp={() => setVis('hover')}
            onFocus={() => setVis('hover')}
            onBlur={() => setVis('default')}
        >
            {label}
        </button>
    )
}
