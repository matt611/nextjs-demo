'use client';
import { useContext } from 'react';
import { MembersContext } from '../MembersContext';
import AdminMemberList from './components/AdminMemberList';

function Admin() {
  const members = useContext(MembersContext);

  return (
    <div>
      <div>Admin</div>
      <AdminMemberList members={members}/>
    </div>
  );
}

export default Admin;