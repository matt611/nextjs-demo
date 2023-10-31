// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
import { DefaultContext } from 'react-icons';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: number,
      email: string,
      username?: string,
      role?: string,
      avatarUrl?: string,
      fullname?: string,
    } & DefaultUser,
  };

  interface User extends DefaultUser {
    id?: number,
    email: string,
    username?: string,
    role?: string,
    avatarUrl?: string,
    fullname?: string,
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user?: {
      id: number,
      username: string,
      role?: string,
      avatarUrl?: string,
      fullname?: string,
    }
  }
}