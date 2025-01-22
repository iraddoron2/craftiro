import { Typography, TypographyProps } from '@mui/material'

type TextProps = {
    text: string
    variant?: TypographyProps['variant']
    sx?: TypographyProps['sx']
}

export const Text = ({ text, variant, sx }: TextProps) => {
    return (
        <Typography variant={variant} sx={{ fontFamily: 'inherit', ...sx }}>
            {text}
        </Typography>
    )
}
