import { withAuth } from 'next-auth/middleware';
import { Roles } from './app/services/user/UserService';
import { JWT } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    if (!adminCheck(req.nextauth.token, req.nextUrl.pathname)) {
      return new NextResponse('unauthorized', { status: 401 });
    } 
  },
);

const adminCheck = (token: JWT | null, path: string): boolean => {
  console.log('checking admin');
  console.log(path);
  console.log(token);
  if (!token) return false;

  return (
    !adminPaths.includes(path) || 
    token.user?.role === Roles.ADMIN
  );
};

export const config = { 
  matcher: [
    '/dashboard', 
    '/members', 
    '/members/admin',
    '/profile'
  ], 
};

export const adminPaths = [
  '/members/admin',
];