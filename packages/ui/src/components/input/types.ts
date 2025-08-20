import type React from 'react'

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Extra class for the input element */
    className?: string
    /** Extra class for the wrapper element */
    wrapperClassName?: string
}
