import { User } from '@prisma/client';
import AdminMemberRow from './AdminMemberRow';

type AdminMemberListProps = {
  members: User[];
}

function AdminMemberList({ members }: AdminMemberListProps) {
  return (
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>role</td>
          <td>email</td>
          <td>username</td>
          <td>fullname</td>
          <td>avatarUrl</td>
        </tr>
      </thead>
      <tbody>
        { members.map(member => { return (<AdminMemberRow member={member} key={member.id}/>); })}
      </tbody>
    </table>  
  );
}

export default AdminMemberList;