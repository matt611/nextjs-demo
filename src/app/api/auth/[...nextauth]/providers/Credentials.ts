import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

const credentialsProvider = CredentialsProvider({
  name: 'email',
  async authorize(credentials, req) {
    const { email, password } = credentials ?? {};
    if (!email || !password) {
      throw new Error('Missing username or password');
    }
    const user = {username: 'matt', email: 'matt@candombe.com', id:1 }; //await UserService.getByEmailorUsername({ email });
    // if user doesn't exist or password doesn't match
    // if (!user || !(await compare(password, user.password))) {
    //   throw new Error('Invalid username or password');
    // }
    return {
      username: user.username,
      email: user.email,
      id: user.id,
    };
  },
  credentials: {
    email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
    password: { label: 'Password', type: 'password' },
  },
});

export default credentialsProvider;