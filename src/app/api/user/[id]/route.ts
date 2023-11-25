import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import UserService from '@/app/services/user/UserService';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const id = parseInt(params.id || '');

  if (!session?.user?.id) return NextResponse.json({},{status: 401});

  const fields = {
    id: true,
    role: false,
    email: true,
    username: true,
    fullname: false,
    avatarUrl: true,
  };

  if (session?.user?.id === id) {
    fields.role = true;
    fields.fullname = true;
  }

  try {
    const user = await UserService.getOne(id);
    return NextResponse.json(user);
  } catch(e) {
    return NextResponse.json({ error: e}, {status: 500});
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  console.log('putting a user');

  const session = await getServerSession(authOptions);
  const id = parseInt(params.id || '');

  if ((session?.user?.id !== id) && (session?.user?.role !== 'admin')) return NextResponse.json({},{status: 401});
  console.log('check body');
  const body = await req.json();
  console.log(body);

  const email = body.email;
  const username = body.username;
  const fullname = body.fullname;
  const avatarUrl = body.avatarUrl;
  const role = body.role;
  
  try {
    const user = await UserService.patch(id, {
      email,
      username,
      fullname,
      avatarUrl,
      role,
    });
    return NextResponse.json(user);
  } catch(e) {
    return NextResponse.json({ error: e}, {status: 500});
  }
}

export async function DELETE(request: NextRequest,{ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const id = parseInt(params.id || '');

  if ((session?.user?.id !== id) && (session?.user?.role !== 'admin')) return NextResponse.json({},{status: 401});

  // this is gonna take some work. Need to clean up all the tables that have stuff associated with this user

  return NextResponse.json({error: 'unsupported'}, {status: 500});
}