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
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };