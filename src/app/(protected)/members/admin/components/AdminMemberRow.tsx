import { User } from '@prisma/client';

type AdminMemberRowProps = {
  member: User;
}
function AdminMemberRow({ member }: AdminMemberRowProps) {
  return (
    <tr>
      <td>{member.id}</td>
      <td>{member.role}</td>
      <td>{member.email}</td>
      <td>{member.username}</td>
      <td>{member.fullname}</td>
      <td>{member.avatarUrl}</td>
    </tr>
  );
}

export default AdminMemberRow;