import prismaClient from '../prisma/client';
import { User } from '@prisma/client';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

interface UserEdits {
  password?: string;
  email?: string;
  username?: string;
  fullname?: string;
  avatarUrl?: string;
  role?: string;
}

interface EmailOrUsername {
  email?: string;
  username?: string;
}

interface NewUser {
  email: string;
  username: string;
  fullname: string;
  password: string;
  avatarUrl?: string;
}

interface IUserService extends Omit<ICrudService<User>, 'create' | 'getAll'> {
  create: (data: NewUser) => Promise<User>;
  getAll: (role: string) => Promise<any>;
  getByEmailorUsername: (input: EmailOrUsername) => Promise<User | null>;
  patch: (id: number, data: UserEdits) => Promise<User>
}

interface UserSelectFields {
  id: boolean,
  role: boolean,
  email: boolean,
  username: boolean,
  password: boolean,
  fullname: boolean,
  avatarUrl: boolean,
}

const noUserFields = {
  id: false,
  role: false,
  email: false,
  username: false,
  password: false,
  fullname: false,
  avatarUrl: false,
};

const userFields = {
  ...noUserFields,
  id: true,
  email: true,
  username: true,
  fullname: true,
  avatarUrl: true,
};

const adminFields = {
  ...userFields,
  role: true,
};

const fieldsByRole: { [key: string]: UserSelectFields} = {
  user: userFields,
  admin: adminFields,
};

export const UserService: IUserService = {
  getAll: (role) => {
    return prismaClient.user.findMany({
      select: fieldsByRole[role] || noUserFields,
    });
  },

  getOne: (id) => prismaClient.user.findFirst({ where: { id } }),
  create: (data) => prismaClient.user.create({ data }),
  update: (id, data) => prismaClient.user.update({ where: { id }, data }),
  delete: (id) => prismaClient.user.delete({ where: { id } }),
  getByEmailorUsername: ({ email, username }) => prismaClient.user.findFirst({ 
    where: { 
      OR: [
        { email },
        { username }
      ] 
    }
  }),
  patch: (id, data) => prismaClient.user.update({ where: { id }, data })
};

export default UserService;