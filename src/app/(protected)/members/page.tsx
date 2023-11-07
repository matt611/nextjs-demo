'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MemberList from './components/MemberList';
import { useContext } from 'react';
import { MembersContext } from './MembersContext';


function Members() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) router.push('/');

  const members = useContext(MembersContext);

  return (
    <div>
      <div>Members</div>
      <MemberList members={ members }/>
    </div>
  );
}

export default Members;