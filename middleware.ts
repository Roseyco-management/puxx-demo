import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken, verifyToken } from '@/lib/auth/session';

const protectedRoutes = ['/dashboard', '/account'];
const adminRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  let res = NextResponse.next();

  // Handle admin routes - require session and admin role
  if (isAdminRoute) {
    if (!sessionCookie) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      const parsed = await verifyToken(sessionCookie.value);

      // Check if user has admin role (you can customize this check)
      // For now, we'll allow access if they have a valid session
      // You can add role checking here when you implement the roles in your session token
      if (!parsed?.user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // TODO: Check user role from database if needed
      // const hasAdminRole = await checkUserRole(parsed.user.id);
      // if (!hasAdminRole) {
      //   return NextResponse.redirect(new URL('/', request.url));
      // }

    } catch (error) {
      console.error('Invalid session for admin route:', error);
      res.cookies.delete('session');
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Handle regular protected routes
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionCookie && request.method === 'GET') {
    try {
      const parsed = await verifyToken(sessionCookie.value);
      const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookies.set({
        name: 'session',
        value: await signToken({
          ...parsed,
          expires: expiresInOneDay.toISOString()
        }),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: expiresInOneDay
      });
    } catch (error) {
      console.error('Error updating session:', error);
      res.cookies.delete('session');
      if (isProtectedRoute || isAdminRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs'
};
