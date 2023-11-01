import prismaClient from '../prisma/client';
import { User } from '@prisma/client';

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

interface IUserService extends Omit<ICrudService<User>, 'create'> {
  create: (data: NewUser) => Promise<User>;
  getByEmailorUsername: (input: EmailOrUsername) => Promise<User | null>;
  patch: (id: number, data: UserEdits) => Promise<User>
}

const UserService: IUserService = {
  getAll: () => prismaClient.user.findMany(),
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