'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { User } from '@prisma/client';

function Profile() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  console.log('PROFILE');
  console.log(session);

  const fetchUser = async(id: number) => {
    console.log('fetching user');
    console.log(session);
    console.log(`user id ${id}`);
    setLoading(true);
    setError('');
    try {
      const fetchResult = await fetch(`/api/user/${id}`);
      console.log('Fetch Result');
      console.log(fetchResult);
      if (fetchResult.status === 200) {
        const user = await fetchResult.json();
        console.log('Body');
        console.log(user);
        setUser(user);
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
    console.log('profile useEffect');
    console.log(session);
    if (session?.user?.id) fetchUser(session?.user?.id);
  }, []);
  
  return (
    <div>Profile</div>
  );
}

export default Profile;