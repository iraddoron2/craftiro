import clsx from 'clsx'
import React from 'react'
import type { InputProps } from './types'

export const Input: React.FC<InputProps> = ({
    className,
    wrapperClassName,
    style,
    disabled = false,
    ...rest
}) => {
    return (
        <div
            className={clsx(
                'crt-input relative flex items-center w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm transition-all duration-200',
                'focus-within:ring-2 focus-within:ring-blue-500 hover:border-blue-400',
                disabled && 'bg-gray-100 cursor-not-allowed opacity-70',
                wrapperClassName
            )}
            style={style}
        >
            <input
                className={clsx(
                    'w-full bg-transparent outline-none placeholder-gray-400 text-gray-900',
                    className
                )}
                disabled={disabled}
                {...rest}
            />
        </div>
    )
}
