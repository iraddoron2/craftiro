// types/theme.ts (or wherever Theme is defined)

export type Theme = {
    background: {
        page: string
        topNavbar: string
        sideNavbar: string
        card: string
        miroColors: {
            1: string
            2: string
            3: string
            4: string
            5: string
            6: string
        }
        opacityCover: string
    }
    text: {
        onPageBackground: string
        onContrastBackground: string
    }
    button: {
        primary: VariantsTokens
        secondary: VariantsTokens
    }
    /** NEW: chip theme tokens */
    chip: {
        primary: ChipVariantsTokens
        secondary: ChipVariantsTokens
        default: ChipVariantsTokens
    }
    common: {
        border: string
    }
}

/** Reuse this shape for button variants */
type VariantsTokens = {
    contained: UIStateTokens
    outlined: UIStateTokens
    text: UIStateTokens
}

/** For chip we usually need only 'filled' and 'outlined' */
type ChipVariantsTokens = {
    filled: UIStateTokens
    outlined: UIStateTokens
}

/** Colors per interaction state */
type UIStateTokens = {
    default: { background: string; text: string; border: string }
    hover: { background: string; text: string; border: string }
    active: { background: string; text: string; border: string }
}
