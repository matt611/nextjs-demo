'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ACTIVE_ROUTE = 'py-1 px-2 text-gray-900 bg-white rounded-l';
const INACTIVE_ROUTE = 'py-1 px-2 hover:bg-fuchsia-300 rounded-l';

function SideNav() {
  const { data: session } =  useSession();
  console.log(session);
  const pathname = usePathname();
  
  return (
    <div className="bg-gray-200 text-gray-600 py-6 ml-2">
      <ul>
        <Link href="/dashboard">
          <li className={pathname === '/dashboard' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            dashboard 
          </li>
        </Link>
        <Link href="/members">
          <li className={pathname === '/members' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            members
          </li>
        </Link>
        <Link href="/profile">
          <li className={pathname === '/profile' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            profile
          </li>
        </Link>
        { session?.user?.role === 'admin' &&
          <Link href="/admin">
            <li className={pathname === '/admin' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
              admin
            </li>
          </Link>
        }
      </ul>
    </div>
  );
}

export default SideNav;