import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const {pathname} = req.nextUrl;
    
    if (pathname.startsWith("/api/auth" || token)) {
        return NextResponse.next();
    }
    
    if(!token && pathname.startsWith("/") && pathname !== "/"){
        return NextResponse.redirect(new URL ("/api/auth/signin", req.url));
    }

    //temporary fix to redirect to the short term range
    if(pathname.startsWith("/Boardcreator") && !req.nextUrl.search.startsWith("?timeRange=")){
        return NextResponse.redirect(new URL ("/Boardcreator?timeRange=short_term", req.url));
    }  
}