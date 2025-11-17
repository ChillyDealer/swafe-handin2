import { fetchBase } from '@/app/_data/api-base';
import { User } from '@/app/_types/user';

export async function getUsers(): Promise<User[]> {
  const response = await fetchBase('users');
  return response.json();
}

export async function postUser(user: User) {
  return await fetchBase('users', { body: JSON.stringify(user) });
}
