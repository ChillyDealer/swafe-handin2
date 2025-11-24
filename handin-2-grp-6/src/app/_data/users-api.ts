import { fetchBase } from '@/app/_data/api-base';
import { PostUserDto, User } from '@/app/_types/user';

export async function getUserById(id: number): Promise<User | undefined> {
  const response = await fetchBase(`users/${id}`);
  return response.json();
}

export async function getAllUsers(): Promise<User[]> {
  const response = await fetchBase('users');
  return response.json();
}

export async function getClients(): Promise<User[]> {
  const response = await fetchBase('users/clients');
  return response.json();
}

export async function postUser(user: PostUserDto) {
  return await fetchBase('users', 'POST', { body: JSON.stringify(user) });
}
