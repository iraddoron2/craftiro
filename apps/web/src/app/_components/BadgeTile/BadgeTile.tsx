'use client'

export type BadgeTileProps = {
    /** Text shown inside the tile */
    label: string
    /** Background color (HEX/RGB/HSL) */
    color: string
    /** Optional width (px, %, etc.) */
    width?: number | string
    /** Optional height (px, %, etc.) */
    height?: number | string
    /** Corner radius in px */
    radius?: number
    /** Extra className */
    className?: string
    /** Extra style */
    style?: React.CSSProperties
}

export const BadgeTile: React.FC<BadgeTileProps> = ({
    label,
    color,
    radius = 12,
    className,
    style,
}) => {
    const text = '#ffffff'
    return (
        <div
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 14px',
                background: color,
                color: text,
                fontWeight: 800,
                fontSize: '20px',
                letterSpacing: 0.2,
                borderRadius: radius,
                width: '214px',
                height: '80px',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 10px rgba(0,0,0,.06)',
                ...style,
            }}
        >
            {label}
        </div>
    )
}
