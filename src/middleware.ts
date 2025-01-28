import { NextRequest, NextResponse } from 'next/server'
import { getBaseDomain } from './helpers'

export default async function middleware(request: NextRequest) {
    console.log('In the middleware mouth')
    console.log('request', request)

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
