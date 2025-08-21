'use client'

import React, { forwardRef } from 'react'

export type InputProps = {
    id?: string
    name?: string
    label?: string
    placeholder?: string
    value?: string
    defaultValue?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'
    disabled?: boolean
    required?: boolean
    autoComplete?: string
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
    describedBy?: string // id של טקסט עזר/שגיאה
    className?: string
    style?: React.CSSProperties

    /** טקסט עזר קטן מתחת לשדה (אופציונלי) */
    description?: string
    /** הודעת שגיאה (אופציונלי) */
    error?: string
}

/**
 * Input בסיסי שמקבל צבעים ורקעים מהתמות דרך CSS variables.
 * ללא state פנימי או גישה ל-window — SSR friendly.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        id,
        name,
        label,
        placeholder,
        value,
        defaultValue,
        onChange,
        onBlur,
        onFocus,
        type = 'text',
        disabled = false,
        required = false,
        autoComplete,
        inputMode,
        describedBy,
        className,
        style,
        description,
        error,
    },
    ref
) {
    const inputId = id || `input-${name || Math.random().toString(36).slice(2)}`
    const descId = description ? `${inputId}-desc` : undefined
    const errId = error ? `${inputId}-err` : undefined

    const describedByIds =
        [describedBy, descId, errId].filter(Boolean).join(' ') || undefined

    return (
        <div
            className={className}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                ...style,
            }}
        >
            {label && (
                <label
                    htmlFor={inputId}
                    style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--color-text-on-background)',
                    }}
                >
                    {label}
                    {required && <span aria-hidden="true"> *</span>}
                </label>
            )}

            <input
                ref={ref}
                id={inputId}
                name={name}
                type={type}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                required={required}
                autoComplete={autoComplete}
                inputMode={inputMode}
                aria-invalid={!!error || undefined}
                aria-describedby={describedByIds}
                style={{
                    // מידות/טיפוגרפיה
                    padding: '10px 12px',
                    fontSize: 16,
                    lineHeight: 1.4,
                    fontFamily: 'inherit',
                    borderRadius: 'var(--radius-md, 8px)',

                    // צבעים לפי tokens (מגיעים מהתמה)
                    color: 'var(--color-text-on-background)',
                    background: 'var(--color-background-main, #fff)',
                    borderStyle: 'solid',
                    borderWidth: 'var(--border-width-10, 1px)',
                    borderColor: error
                        ? 'var(--color-red-main, #ec4033)'
                        : 'var(--color-border-default, var(--color-gray-170, #ced0d1))',

                    // פוקוס/מעברים
                    outline: 'none',
                    transition:
                        'border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
                    boxShadow: 'none',
                }}
                onFocus={(e) => {
                    // לא משנים style דינמית; נשענים על outline/box-shadow מהתמה אם תרצה.
                    // אם בכל זאת רוצים הדגשת פוקוס inline תקפה SSR-wise:
                    e.currentTarget.style.boxShadow =
                        '0 0 0 3px var(--color-intent-primary-subtle, rgba(34,102,199,0.20))'
                    e.currentTarget.style.borderColor =
                        'var(--color-intent-primary-main, #2266c7)'
                    onFocus?.(e)
                }}
                onBlur={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = error
                        ? 'var(--color-red-main, #ec4033)'
                        : 'var(--color-border-default, var(--color-gray-170, #ced0d1))'
                    onBlur?.(e)
                }}
            />

            {description && (
                <small
                    id={descId}
                    style={{
                        fontSize: 12,
                        color: 'var(--color-text-secondary, var(--color-gray-120))',
                    }}
                >
                    {description}
                </small>
            )}

            {error && (
                <small
                    id={errId}
                    style={{
                        fontSize: 12,
                        color: 'var(--color-red-main, #ec4033)',
                        fontWeight: 600,
                    }}
                >
                    {error}
                </small>
            )}
        </div>
    )
})
