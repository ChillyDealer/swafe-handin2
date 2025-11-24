import { ScrollArea, Table } from '@radix-ui/themes';
import { getAllUsers, getClients } from '@/app/_data/users-api';
import type { User } from '@/app/_types/user';
import { AuthService } from '@/app/services/auth.service';

export async function UsersTable() {
  const role = await AuthService.getRole();

  let users: User[] = [];
  let error: string | null = null;

  try {
    users = await (role === 'Manager' ? getAllUsers : getClients)();
  } catch (err) {
    console.error('Failed to fetch users:', err);
    error = err instanceof Error ? err.message : 'Failed to fetch users';
  }

  if (error) {
    return <div className='p-8 text-center text-red-600'>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div className='p-8 text-center text-gray-500'>No users found</div>;
  }

  return (
    <ScrollArea scrollbars='vertical'>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>E-mail</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Personal trainer</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Account type</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => {
            const personalTrainer = users.find(
              (u) => u.userId === user.personalTrainerId,
            );

            return (
              <Table.Row key={user.userId}>
                <Table.Cell>
                  {user.userId} {user.firstName} {user.lastName}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {personalTrainer
                    ? `${personalTrainer.firstName} ${personalTrainer.lastName}`
                    : '-'}
                </Table.Cell>
                <Table.Cell>{user.accountType}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </ScrollArea>
  );
}
