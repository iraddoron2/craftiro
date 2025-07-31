export type Theme = {
    background: {
        page: string
        topNavbar: string
        sideNavbar: string
        miroColors: {
            1: string
            2: string
            3: string
            4: string
            5: string
            6: string
        }
        opacityCover: string // Opacity for cover backgrounds
    }
    text: {
        onPageBackground: string
        onContrastBackground: string // Text color for contrast backgrounds
    }
    button: {
        primary: {
            contained: {
                default: {
                    background: string
                    text: string
                    border: string
                }
                hover: {
                    background: string
                    text: string
                    border: string
                }
                active: {
                    background: string
                    text: string
                    border: string
                }
            }
            outlined: {
                default: {
                    background: string
                    text: string
                    border: string
                }
                hover: {
                    background: string
                    text: string
                    border: string
                }
                active: {
                    background: string
                    text: string
                    border: string
                }
            }
            text: {
                default: {
                    background: string // Usually transparent for text buttons
                    text: string
                    border: string // Usually transparent for text buttons
                }
                hover: {
                    background: string // Usually transparent for text buttons
                    text: string
                    border: string // Usually transparent for text buttons
                }
                active: {
                    background: string // Usually transparent for text buttons
                    text: string
                    border: string // Usually transparent for text buttons
                }
            }
        }
        secondary: {
            contained: {
                default: {
                    background: string
                    text: string
                    border: string
                }
                hover: {
                    background: string
                    text: string
                    border: string
                }
                active: {
                    background: string
                    text: string
                    border: string
                }
            }
            outlined: {
                default: {
                    background: string
                    text: string
                    border: string
                }
                hover: {
                    background: string
                    text: string
                    border: string
                }
                active: {
                    background: string
                    text: string
                    border: string
                }
            }
            text: {
                default: {
                    background: string // Usually transparent for text buttons
                    text: string
                    border: string // Usually transparent for text buttons
                }
                hover: {
                    background: string // Usually transparent for text buttons
                    text: string
                    border: string // Usually transparent for text buttons
                }
                active: {
                    background: string // Usually transparent for text buttons
                    text: string
                    border: string // Usually transparent for text buttons
                }
            }
        }
    }
}
