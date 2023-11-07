import React from 'react';
import { User } from '@prisma/client';
import Image from 'next/image';

type MemberRowProps = {
  member: User;
}

function MemberRow({ member }: MemberRowProps) {
  
  return (
    <div className='flex-col w-64 border-2 border-black rounded-xl '>
      <div className='w-full items-center border-2'>
        <Image 
          alt={`${member?.username} avatar`} 
          src={member?.avatarUrl || '/images/avatarDefault.png'} 
          height={64} 
          width={64} 
          className='rounded-full'
        />
      </div>
      <div>{member?.role}</div>
      <div>{member?.username}</div>
      <div>{member?.fullname}</div>
      <div>{member?.email}</div>
      <div>{member?.avatarUrl}</div>
    </div>
  );
}

export default MemberRow;