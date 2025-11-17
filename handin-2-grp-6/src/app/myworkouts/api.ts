import { ApiBaseUrl } from "@/app/_data/api-base";
import type { WorkoutProgram } from "./types";

export const fetchWorkoutPrograms = async (token: string): Promise<WorkoutProgram[]> => {
    const response = await fetch(`${ApiBaseUrl}WorkoutPrograms`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error("no fetch for workouts");
    }

    return response.json();
};
