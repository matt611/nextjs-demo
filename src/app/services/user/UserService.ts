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

interface IUserService extends ICrudService<User> {
  getByEmailorUsername: (identifier: string) => Promise<User | null>;
  patch: (id: number, data: UserEdits) => Promise<User>
}

const UserService: IUserService = {
    getAll: () => prismaClient.user.findMany(),
    getOne: (id: number) => prismaClient.user.findFirst({ where: { id }}),
    create: (data) => prismaClient.user.create({ data }),
    update: (id, data) => prismaClient.user.update({ where: { id }, data }),
    delete: (id) => prismaClient.user.delete({ where: { id }}),
    getByEmailorUsername: (identifier: string) => prismaClient.user.findFirst({ 
      where: { 
        OR: [ 
          { email: identifier}, 
          { username: identifier },
        ]
      }
    }),
    patch: (id, data) => prismaClient.user.update({ where: { id }, data })
};

export default UserService;