import { createContext } from 'react';
import { User } from '@prisma/client';

export const MembersContext = createContext<User[]>([]);