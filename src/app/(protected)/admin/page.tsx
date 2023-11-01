'use client';
import { useSession } from 'next-auth/react';

function Admin() {
  const { data: session } =  useSession();
  console.log(session);

  return (
    <>
      { session?.user?.role === 'admin' ?
          <div>Admin</div>
          :
          <div>Unauthorized</div>
      }
    </>
  );
}

export default Admin;