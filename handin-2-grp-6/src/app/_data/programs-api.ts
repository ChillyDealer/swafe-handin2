import { fetchBase } from './api-base';
import { Client, CreateWorkoutProgram } from '../myworkouts/types';

export type { CreateWorkoutProgram } from '../myworkouts/types';

export async function getClients(): Promise<Client[]> {
  const response = await fetchBase('Users/Clients');

  if (!response.ok) {
    throw new Error('fail get clients');
  }

  return response.json();
}

export async function createWorkoutProgram(body: CreateWorkoutProgram) {
  const response = await fetchBase('WorkoutPrograms', 'POST', {
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('fail create program');
  }

  return response.json();
}
