import React from 'react';
import { User } from '@prisma/client';
import MemberRow from './MemberRow';

type MemberListProps = {
  members: User[];
};

function MemberList({ members }: MemberListProps) {
  return (
    <ul className='flex'>
      { members.map(member => {
        return (
          <li key={member.id}>
            <MemberRow member={member}/>
          </li>
        );
      })}
    </ul>
  );
}

export default MemberList;