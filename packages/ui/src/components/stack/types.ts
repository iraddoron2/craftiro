export type StackDirection = 'row' | 'column'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type StackJustify =
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around'
    | 'evenly'

export type StackOwnProps = {
    as?: React.ElementType
    direction?: StackDirection
    gap?: number | string
    align?: StackAlign
    justify?: StackJustify
    wrap?: boolean
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

/** טיפוס עזר לפולימורפיות: props של Stack + כל ה-props של האלמנט שנבחר, בלי התנגשויות */
export type PolymorphicProps<T extends React.ElementType, P> = P & {
    as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, keyof P | 'as'>
