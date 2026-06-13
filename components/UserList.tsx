import { fetchSlowUsers } from '@/lib/api';

import { UserCard } from '@/lib/types';

export async function UsersList() {
  const users = await fetchSlowUsers();

  if (!users) {
    return <p>Users fetch failed</p>;
  }

  return (
    <ul className="space-y-1">
      {users.map((user: UserCard) => (
        <li key={user.id} className="border-b pb-1">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </li>
      ))}
    </ul>
  );
}
