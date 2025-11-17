import { Exercise } from '../_types/exercise';
import { fetchBase } from './api-base';

export async function postExercise(exercise: Exercise) {
  const response = await fetchBase('Exercises', {
    method: 'POST',
    body: JSON.stringify(exercise),
  });

  if (!response.ok) {
    throw new Error('Failed to post exercise');
  }

  return response.json();
}

export async function postExerciseToWorkout(
  exercise: Exercise,
  workoutProgramId: number,
) {
  const response = await fetchBase(`Exercises/Program/${workoutProgramId}`, {
    method: 'POST',
    body: JSON.stringify(exercise),
  });

  if (!response.ok) {
    throw new Error('Failed to post exercise to workout program');
  }

  return response.json();
}
