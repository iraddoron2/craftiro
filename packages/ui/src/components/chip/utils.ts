import type { ChipColor, ChipSize, ChipVariant } from './types'

/** Size presets */
export const sizeStyles: Record<ChipSize, React.CSSProperties> = {
    small: { fontSize: 12, padding: '2px 8px', height: 24 },
    medium: { fontSize: 14, padding: '4px 10px', height: 32 },
    large: { fontSize: 16, padding: '6px 14px', height: 40 },
}

/** Simple theme map (can be replaced with CSS vars/tokens) */
const THEME_MAP = {
    default: {
        filled: {
            default: { background: '#eee', text: '#333', border: '#eee' },
            hover: { background: '#e5e5e5', text: '#222', border: '#e5e5e5' },
            active: { background: '#dcdcdc', text: '#111', border: '#dcdcdc' },
        },
        outlined: {
            default: {
                background: 'transparent',
                text: '#333',
                border: '#ccc',
            },
            hover: {
                background: 'rgba(0,0,0,0.04)',
                text: '#222',
                border: '#bdbdbd',
            },
            active: {
                background: 'rgba(0,0,0,0.08)',
                text: '#111',
                border: '#9e9e9e',
            },
        },
    },
    primary: {
        filled: {
            default: { background: '#2563eb', text: '#fff', border: '#2563eb' },
            hover: { background: '#1d4ed8', text: '#fff', border: '#1d4ed8' },
            active: { background: '#1e40af', text: '#fff', border: '#1e40af' },
        },
        outlined: {
            default: {
                background: 'transparent',
                text: '#1d4ed8',
                border: '#1d4ed8',
            },
            hover: {
                background: 'rgba(29,78,216,0.08)',
                text: '#1d4ed8',
                border: '#1d4ed8',
            },
            active: {
                background: 'rgba(29,78,216,0.16)',
                text: '#1e40af',
                border: '#1e40af',
            },
        },
    },
    secondary: {
        filled: {
            default: { background: '#7c3aed', text: '#fff', border: '#7c3aed' },
            hover: { background: '#6d28d9', text: '#fff', border: '#6d28d9' },
            active: { background: '#5b21b6', text: '#fff', border: '#5b21b6' },
        },
        outlined: {
            default: {
                background: 'transparent',
                text: '#6d28d9',
                border: '#6d28d9',
            },
            hover: {
                background: 'rgba(109,40,217,0.08)',
                text: '#6d28d9',
                border: '#6d28d9',
            },
            active: {
                background: 'rgba(109,40,217,0.16)',
                text: '#5b21b6',
                border: '#5b21b6',
            },
        },
    },
} as const

type StateKey = 'default' | 'hover' | 'active'

export function getChipStyle(
    color: ChipColor,
    variant: ChipVariant,
    state: StateKey
) {
    const c = THEME_MAP[color] ?? THEME_MAP.default
    const v = c[variant] ?? c.filled
    return v[state] ?? v.default
}

export function isClickable(opts: {
    onClick?: () => void
    disabled?: boolean
}) {
    return Boolean(opts.onClick) && !opts.disabled
}
