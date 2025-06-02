import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl.pathname;

   if (!token) {
    if (url !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
  

  // 🔥 Verifikasi token dengan API Laravel
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-from-token`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    if (url !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  const data = await response.json();
  const role = data.user.role;
 
  if (url.startsWith('/login') && token) {
    if (role.name === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    else  {
      return NextResponse.redirect(new URL('/user', request.url));
    }
  }

   if (url === '/' && token) {
    if (role.name === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
   else {
      return NextResponse.redirect(new URL('/user', request.url));
    }
  }
 
  // 🔒 Proteksi akses
  if (url.startsWith('/admin') && role.name !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((url.startsWith('/user') || url.startsWith('/membership') || url.startsWith('/membership') || url.startsWith('/giveaways') || url.startsWith('/major-draw-winners') || url.startsWith('/my-entries') || url.startsWith('/partners') || url.startsWith('/stores') || url.startsWith('/categories') || url.startsWith('/purchase-history') )   && role.name !== 'user') {
    
    return NextResponse.redirect(new URL('/login', request.url));
  }
 
  return NextResponse.next();

}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/membership', '/giveaways', '/major-draw-winners', '/my-entries', '/partners', '/stores', '/categories','/login', '/purchase-history','/' ],
};