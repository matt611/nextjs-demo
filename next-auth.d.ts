// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
import { DefaultContext } from 'react-icons';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: number,
      email: string,
      username?: string | null,
      role?: string| null,
      avatarUrl?: string| null,
      fullname?: string| null,
    } & DefaultUser,
  };

  interface User extends DefaultUser {
    id?: number,
    email: string,
    username?: string | null,
    role?: string | null,
    fullname?: string | null,
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user?: {
      id: number,
      username: string,
      role?: string | null,
      avatarUrl?: string | null,
      fullname?: string | null,
    }
  }
}