'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { MembersContext } from './MembersContext';
import LoadingDots from '@/app/components/loading/loading-dots';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) router.push('/');

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<User[]>([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const fetchResult = await fetch('/api/user');
      if (fetchResult.status === 200) {
        const members = await fetchResult.json();
        setMembers(members);
        setLoading(false);
      } else {
        setLoading(false);
        setError(fetchResult.statusText);
      }
    } catch (err) {
      console.log('error fetching members');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {loading && (
        <div>
          <LoadingDots color='#808080' />
        </div>
      )}
      { error && (
          <div style={{color: 'red' }}>
            {error}
          </div>
      )}
      { (!loading && !error) && (
        <div className='flex-col justify-start w-full h-full p-4'>
          <MembersContext.Provider value={members}>
            {children}
          </MembersContext.Provider>
        </div>
      )}
    </>
  );
}