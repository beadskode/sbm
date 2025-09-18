import { type NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = await auth();

  const didLogin = !!session?.user?.email;
  if (!didLogin) {
    NextResponse.redirect(new URL(`/sign?redirectTo=${pathname}`, req.url));
    return;
  }
  return NextResponse.next();
}

export const config = {
  runtime: 'nodejs', // TODO: remove nodejs runtime (편리하지만, 성능적으로 불리하므로)
  matcher: [
    '/((?!sign|_next/static|_next/image|forgotpasswd|api/auth|registcheck|favicon.ico|robots.txt|images|.well-known|$).*)',
    '/api/:path*',
  ], // matching 된 것에만 적용
};
