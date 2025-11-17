'use client';

import { useEffect, useState } from "react";
import { AuthService } from "@/app/services/auth.service";
import { fetchWorkoutPrograms } from "../api";
import { WorkoutCard } from "./workout-card";
import type { WorkoutProgram } from "../types";

export function WorkoutsGrid() {
    const [workouts, setWorkouts] = useState<WorkoutProgram[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        const token = AuthService.getTokenSync();
        if (!token) {
            setError("Not authenticated");
            setLoading(false);
            return;
        }

        try {
            const data = await fetchWorkoutPrograms(token);
            setWorkouts(data);
        } catch (err) {
            setError("Failed to load workouts");
            console.error("Error loading workouts:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-white text-xl">Loading workouts...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    if (workouts.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-400 text-xl">No workouts found...</div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workouts.map((workout, index) => (
                <WorkoutCard key={`workout-${workout.workoutProgramId}-${index}`} workout={workout} />
            ))}
        </div>
    );
}
