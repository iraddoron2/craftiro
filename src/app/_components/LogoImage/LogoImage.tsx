import { sizes } from '@/styles'
import { SvgImage } from '@core'
import { Stack } from '@mui/material'

export const LogoImage = () => {
    return (
        <Stack
            sx={{
                position: 'absolute',
                opacity: 0.14,
                maxWidth: '100%',
                transform: 'translateX(-100%)',
                width: 500,
                height: 500,
                [sizes.breakpoints.down('fullHd')]: {
                    width: 400,
                    height: 400,
                },
                [sizes.breakpoints.down('desktop')]: {
                    transform: 'translateX(-50%)',
                    left: '50%',
                },
                [sizes.breakpoints.down('tablet')]: {
                    width: 260,
                    height: 260,
                },
                [sizes.breakpoints.down('mobile')]: {
                    width: 200,
                    height: 200,
                },
            }}
        >
            <SvgImage
                src="svg/Logo For Background.svg"
                alt="Description of the image"
                width={500}
                height={500}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </Stack>
    )
}
