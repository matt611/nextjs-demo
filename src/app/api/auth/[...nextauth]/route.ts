import NextAuth from 'next-auth';
import { AuthOptions, User } from 'next-auth';
import githubProvider from './providers/Github';
import credentialsProvider from './providers/Credentials';
import { AdapterUser } from 'next-auth/adapters';

const verifyUser = (user: User | AdapterUser): User => {
  // NextAuth can not handle int userids https://github.com/nextauthjs/next-auth/issues/7966
  // verifiedUser is a hack to get the types to work out
  return {
    id: parseInt(`${user.id}`), //SUPER HACKY
    email: user.email,
    username: user.username,
    role: user.role,
    fullname: user.fullname,
    avatarUrl: 'asd',
  };
};

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
        token.user = verifyUser(user);
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