'use client';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { User } from '@prisma/client';


type fectUserProps = {
  id: number;
  session: Session;
  setUser: Dispatch<User | undefined>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
}

const fetchUser = async({ id, session, setUser, setError, setLoading }: fectUserProps) => {
  setLoading(true);
  setError('');
  try {
    const fetchResult = await fetch(`/api/user/${id}`);
    if (fetchResult.status === 200) {
      const user = await fetchResult.json();
      setUser(user);
      setLoading(false);

    } else {
      setLoading(false);
      setError(fetchResult.statusText);
    }
  } catch (err) {
    console.error('error fetching members');
    console.error(err);
  }
};

function Profile() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('profile useEffect');
    console.log(session);
    if (session?.user?.id) fetchUser({
      id: session.user.id,
      session,
      setUser,
      setError,
      setLoading,
    });
  }, [session]);
  
  return (
    <div>Profile</div>
  );
}

export default Profile;