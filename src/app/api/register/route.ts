import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import UserService from '@/app/services/user/UserService';

export async function POST(req: Request) {
  console.log('new user request');
  const { email, password, username, fullname } = await req.json();
  console.log(`email ${email} password ${password} usename:${username } fullname:${fullname}`);
  const exists = await UserService.getByEmailorUsername({ email, username });
  if (exists) {
    return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 });
  } else {
    const user = await UserService.create({
      email,
      password: await hash(password, 10),
      username,
      fullname,
    });
    return NextResponse.json(user);
  }
}
