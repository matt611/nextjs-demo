// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number,
      email: string,
      username?: string | null,
      role?: string| null,
      avatarUrl?: string| null,
      fullname?: string| null,
    },
  };

  interface User  {
    id: number,
    email: string,
    username?: string | null,
    role?: string | null,
    avatarUrl?: string| null,
    fullname?: string | null,
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {
      id: number,
      email: string,
      username?: string | null,
      role?: string | null,
      avatarUrl?: string | null,
      fullname?: string | null,
    }
  }
}