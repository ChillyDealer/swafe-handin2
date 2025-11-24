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

export interface Client {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalTrainerId: number;
    accountType: string;
}

export interface CreateWorkoutProgram {
    name: string;
    description: string;
    clientId: number;
}
