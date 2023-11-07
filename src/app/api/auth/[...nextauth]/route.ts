import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import githubProvider from './providers/Github';
import credentialsProvider from './providers/Credentials';


export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    credentialsProvider,
    githubProvider,
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin', // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt(params) {
      const { token, user } = params;
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session(params) {
      const { session, token } = params;
      if (token?.user) {
        session.user = token.user;
      }
      return params.session;
    }
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };