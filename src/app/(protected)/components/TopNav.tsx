'use client';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { RiAccountCircleFill } from 'react-icons/ri';

function TopNav() {
  return (
    <nav className='flex justify-space-between align-items center bg-gray-200 text-gray-600'>
      <div >
        <Link href='/'>
          <Image
            src='/images/logo.avif'
            priority
            alt='Logo'
            className='h-32 w-32 rounded-xl drop-shadow-[0_0_0.5rem_#FF00FF55] m-2'
            width={32}
            height={32}
          />
        </Link>
      </div>
      <div className='flex justify-end items-center w-full p-8 text-lg'>
        <div className='m-4 hover:text-fuchsia-400'>
          <button onClick={(e) => { signOut(); }}>sign out</button>
        </div>
        <div className='text-5xl hover:text-fuchsia-400'>
          <Link href='/profile' >
            <RiAccountCircleFill />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;