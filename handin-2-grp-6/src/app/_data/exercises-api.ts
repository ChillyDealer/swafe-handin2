import { fetchBase } from './api-base';
import { CreateExercise, WorkoutProgram } from '../myworkouts/types';

export type { CreateExercise } from '../myworkouts/types';

export async function getTrainerWorkoutPrograms(): Promise<WorkoutProgram[]> {
  const response = await fetchBase('WorkoutPrograms/trainer', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('fail workout fetch');
  }

  return response.json();
}

export async function postExercise(workoutProgramId: number, body: CreateExercise) {
  const response = await fetchBase(`Exercises/Program/${workoutProgramId}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to post exercise');
  }

  return response.json();
}
