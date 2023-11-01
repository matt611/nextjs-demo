import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log('MIDDLEWARE TOKEN');
    // console.log(req.nextauth.token)
  },
);

export const config = { matcher: ['/dashboard'] };