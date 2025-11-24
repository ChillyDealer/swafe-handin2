export interface Exercise {
    exerciseId: number;
    groupId: string;
    name: string;
    description: string;
    sets: number | null;
    repetitions: number;
    time: string;
    workoutProgramId: number;
    personalTrainerId: number;
}

export interface CreateExercise {
    name: string;
    description: string;
    sets: number | null;
    repetitions: number;
    time: string;
}

export interface WorkoutProgram {
    workoutProgramId: number;
    groupId: string;
    name: string;
    description: string;
    exercises: Exercise[];
    personalTrainerId: number;
    clientId: number;
}
