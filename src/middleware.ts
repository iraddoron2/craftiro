import { NextRequest, NextResponse } from 'next/server'
// import { updateSession } from './lib/auth'
import { getBaseDomain } from './utils'

export default async function middleware(request: NextRequest) {
    console.log('In the middleware mouth')
    console.log('request', request)

    // await updateSession(request)

    const apiUserCall = `${getBaseDomain()}/api/user`
    const getData = async () => {
        const query = await fetch(apiUserCall)
        const response = await query.json()
        console.log('response from api', response)
    }
    getData()

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin'],
}
