import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { UserService, Roles } from '../../services/user/UserService';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({},{status: 401});

  try {
    const users = await UserService.getAll(session?.user?.role || Roles.USER);
    return NextResponse.json(users);
  } catch(e) {
    return NextResponse.json({ error: e});
  }
}
