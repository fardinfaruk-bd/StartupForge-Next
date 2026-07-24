import { NextResponse } from 'next/server'
import { getUserSession } from './lib/core/session'
 
export async function proxy(request) {
    const session = await getUserSession()
    if(session){
        return NextResponse.next()
    }else{
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ['/startups/:path', '/opportunities/:path', "/profile"],
}