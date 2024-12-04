import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getCookie} from "cookies-next";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token  = await getCookie('token', {req: request})
    if(!token){
        return NextResponse.redirect(new URL('/login?redirected=true', request.url))
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/products/:path*', '/orders/:path*', '/checkout/:path*', '/detail/:path*'],
}