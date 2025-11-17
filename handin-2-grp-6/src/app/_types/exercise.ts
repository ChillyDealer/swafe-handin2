export interface Exercise {
  exerciseId: number;
  groupId: string;
  name: string;
  description: string;
  sets: number | null;
  repetitions: number | null;
  time: string | null;
  workoutProgramId: number;
  personalTrainerId: number;
}
