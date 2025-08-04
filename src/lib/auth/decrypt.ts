import { jwtVerify } from 'jose'

const secretJwt = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretJwt)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decrypt = async (input: string): Promise<any> => {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    })
    return payload
}
