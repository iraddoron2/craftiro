import { getSession } from '@/lib/auth'
import { Stack } from '@core'
import { SignInProfileImage } from '../../_components'

export const UserProfileImage = async () => {
    const session = await getSession()

    if (session) {
        return (
            <Stack
                sx={{
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <Stack
                    className="face"
                    sx={{
                        backgroundColor: '#fcba03',
                        width: '400px',
                        height: '400px',
                        borderRadius: '100%',
                    }}
                >
                    <Stack
                        className="mouth"
                        sx={{
                            position: 'absolute',
                            backgroundColor: 'black',
                            width: '215px',
                            height: '90px',
                            borderRadius: '7px 7px 100px 100px',
                            top: '250px',
                            left: '90px',
                        }}
                    ></Stack>
                    <Stack
                        className="eye-section"
                        sx={{
                            border: 'solid red 2px',
                            width: ' 275px',
                            height: '100px',
                            position: 'absolute',
                            left: '60px',
                            top: '70px',
                        }}
                    >
                        <Stack
                            className="left-eye"
                            sx={{
                                backgroundColor: '#4f2103',
                                width: '52px',
                                height: '65px',
                                borderRadius: '50px',
                                position: 'absolute',
                                top: '25px',
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    backgroundColor: 'white',
                                    width: '23px',
                                    height: '23px',
                                    borderRadius: '100px',
                                    position: 'absolute',
                                    top: '20px',
                                    left: '10px',
                                },
                            }}
                        ></Stack>
                        <Stack
                            className="right-eye"
                            sx={{
                                backgroundColor: '#4f2103',
                                width: '52px',
                                height: '65px',
                                borderRadius: '50px',
                                position: 'absolute',
                                top: '25px',
                                right: '20px',
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    backgroundColor: 'white',
                                    width: '23px',
                                    height: '23px',
                                    borderRadius: '100px',
                                    position: 'absolute',
                                    top: '20px',
                                    left: '10px',
                                },
                            }}
                        ></Stack>
                    </Stack>
                </Stack>
            </Stack>
        )
    }

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <SignInProfileImage />
    }

    return null
}
