import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.rewrite(new URL('/404', request.url));
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
    console.log('⛔ Token tidak valid');
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  

  const data = await response.json();

  const role = data.user.role;
  const url = request.nextUrl.pathname;
  console.log(role.name);

  

  // 🔒 Proteksi akses
  if (url.startsWith('/admin') && role.name !== 'admin') {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  if ((url.startsWith('/user') || url.startsWith('/membership') || url.startsWith('/membership') || url.startsWith('/giveaways') || url.startsWith('/major-draw-winners') || url.startsWith('/my-entries') || url.startsWith('/partners') || url.startsWith('/stores') || url.startsWith('/categories') )   && role.name !== 'user') {
    
    return NextResponse.rewrite(new URL('/404', request.url));
  }
 
  return NextResponse.next();

}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/membership', '/giveaways', '/major-draw-winners', '/my-entries', '/partners', '/stores', '/categories'],
};