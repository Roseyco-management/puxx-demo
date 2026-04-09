import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken, verifyToken } from '@/lib/auth/session';
import { VALID_REGIONS } from '@/lib/config/regions';

const protectedRoutes = ['/dashboard', '/account'];
const adminRoutes = ['/admin'];

// Routes that are not region routes and should pass through
const nonRegionPrefixes = ['api', '_next', 'login', 'register', 'admin', 'account', 'dashboard', 'portal', 'fulfilment'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  // --- Region handling (prepended before auth logic) ---

  // Root redirect: / -> /uk
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/uk', request.url));
  }

  // Extract first path segment to check if it's a region
  const pathSegments = pathname.split('/').filter(Boolean);
  const maybeRegion = pathSegments[0];
  const isRegionRoute = VALID_REGIONS.includes(maybeRegion as 'ca' | 'uk' | 'us');
  const isNonRegionRoute = nonRegionPrefixes.includes(maybeRegion);

  // Unknown segment that isn't a known non-region prefix -> redirect to /uk
  if (maybeRegion && !isRegionRoute && !isNonRegionRoute) {
    return NextResponse.redirect(new URL('/uk', request.url));
  }

  // --- Session / auth logic (unchanged from original) ---

  let res = NextResponse.next();

  // Set x-region header for server components on valid region routes
  if (isRegionRoute) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-region', maybeRegion);
    res = NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Handle admin routes - require session and admin role
  if (isAdminRoute) {
    if (!sessionCookie) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      const parsed = await verifyToken(sessionCookie.value);

      if (!parsed?.user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest\\.json|robots\\.txt|sitemap|videos|images).*)'],
  runtime: 'nodejs'
};
