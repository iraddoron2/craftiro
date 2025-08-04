import { SignJWT } from 'jose'
const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

const secretJwt = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretJwt)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encrypt = async (payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Date.now() + 10 * day)
        .sign(key)
}
