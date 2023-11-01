import CredentialsProvider from 'next-auth/providers/credentials';
import UserService from '@/app/services/user/UserService';
import { compare } from 'bcrypt';

const credentialsProvider = CredentialsProvider({
  name: 'email',
  async authorize(credentials, _req) {
    const { email, password } = credentials ?? {};
    if (!email || !password) {
      throw new Error('Missing username or password');
    }
    const user = await UserService.getByEmailorUsername({ email });
    // if user doesn't exist or password doesn't match
    if (!user || !(await compare(password, user.password))) {
      throw new Error('Invalid username or password');
    }
    return user;
  },
  credentials: {
    email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
    password: { label: 'Password', type: 'password' },
  },
});

export default credentialsProvider;