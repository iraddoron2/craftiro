export const elementsSizes = {
    divider: '2px',
    pagesNavbarWidth: '256px',
    mainNavbarHeight: '60px',
}

export const breakpoints = {
    mobileSmall: 360,
    mobile: 600,
    tablet: 960,
    desktop: 1280,
    fullHd: 1920,
} as const
type BreakpointKey = keyof typeof breakpoints

export const up = (key: BreakpointKey) =>
    `@media (minWidth:${breakpoints[key]}px)`
export const down = (key: BreakpointKey) =>
    `@media (maxWidth:${breakpoints[key]}px)`
export const between = (minKey: BreakpointKey, maxKey: BreakpointKey) =>
    `@media (minWidth:${breakpoints[minKey]}px) and (maxWidth:${breakpoints[maxKey]}px)`

export const sizes = {
    breakpoints: {
        up,
        down,
        between,
    },
} as const
