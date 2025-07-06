import {
    Button as MuiBaseButton,
    ButtonProps as MuiButtonProps,
} from '@mui/base/Button'

type ButtonProps = MuiButtonProps & {
    style?: React.CSSProperties
}

export const Button: React.FC<ButtonProps> = ({ style, ...props }) => {
    return (
        <MuiBaseButton
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid transparent',
                backgroundColor: '#2563eb', // blue
                color: 'white',
                fontWeight: 500,
                fontSize: '24px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                transition: 'background-color 0.2s ease',
                ...style, // כדי לאפשר התאמה חיצונית
            }}
            onMouseOver={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    '#1d4ed8' // darker blue on hover
            }}
            onMouseOut={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    '#2563eb'
            }}
            {...props}
        />
    )
}
