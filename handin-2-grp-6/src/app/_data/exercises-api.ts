import { fetchBase } from './api-base';
import { Exercise } from '../myworkouts/types';

export async function postExercise(exercise: Exercise) {
  const response = await fetchBase('Exercises', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exercise),
  });

  if (!response.ok) {
    throw new Error('Failed to post exercise');
  }

  return response.json();
}
