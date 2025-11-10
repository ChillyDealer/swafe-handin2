'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Navbar } from "@/app/_components/navbar";
import { AuthService } from "@/app/services/auth.service";
import { fetchWorkoutPrograms } from "../api";
import type { WorkoutProgram, Exercise } from "../types";

export default function WorkoutDetailPage() {
    const router = useRouter();
    const params = useParams();
    const workoutId = params.id as string;
    
    const [workout, setWorkout] = useState<WorkoutProgram | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadWorkout();
    }, [workoutId]);

    const loadWorkout = async () => {
        const token = AuthService.getToken();
        if (!token) {
            setError("Not authenticated");
            setLoading(false);
            return;
        }

        try {
            const data = await fetchWorkoutPrograms(token);
            const found = data.find(w => w.workoutProgramId.toString() === workoutId);
            
            if (found) {
                setWorkout(found);
            } else {
                setError("Workout not found");
            }
        } catch (err) {
            setError("Failed to load workout");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-white text-xl">Loading workout...</div>
                </div>
            </>
        );
    }

    if (error || !workout) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-red-500 text-xl">{error || "Workout not found"}</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black">
                {/* Header */}
                <div className="bg-[#53659a] py-12 px-8">
                    <div className="max-w-5xl mx-auto">
                        <button 
                            onClick={() => router.push('/')}
                            className="text-white/80 hover:text-white mb-4 flex items-center gap-2 transition-colors"
                        >
                            ← Back to My Workouts
                        </button>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tight">
                            {workout.name}
                        </h1>
                        <p className="text-white/90 text-lg mt-2">
                            {workout.description}
                        </p>
                        <div className="mt-4 flex gap-4">
                            <div className="bg-white/20 px-4 py-2 rounded-lg">
                                <span className="text-white font-semibold">
                                    {workout.exercises.length} Exercises
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exercises List */}
                <div className="max-w-5xl mx-auto px-8 py-12">
                    <div className="space-y-6">
                        {workout.exercises.map((exercise, index) => (
                            <ExerciseCard key={exercise.exerciseId} exercise={exercise} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 hover:border-[#6b9b4c]/50 transition-all">
            <div className="flex items-start gap-6">
                {/* Exercise Number */}
                <div className="flex-shrink-0 w-12 h-12 bg-[#6b9b4c] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>

                {/* Exercise Details */}
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {exercise.name}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                        {exercise.description}
                    </p>

                    {/* Exercise Stats */}
                    <div className="flex flex-wrap gap-3">
                        {exercise.sets !== null && exercise.sets > 0 && (
                            <div className="bg-[#53659a]/20 text-[#53659a] px-4 py-2 rounded-lg border border-[#53659a]/30">
                                <span className="font-semibold">{exercise.sets}</span> Sets
                            </div>
                        )}
                        {exercise.repetitions > 0 && (
                            <div className="bg-[#53659a]/20 text-[#53659a] px-4 py-2 rounded-lg border border-[#53659a]/30">
                                <span className="font-semibold">{exercise.repetitions}</span> Reps
                            </div>
                        )}
                        {exercise.time && (
                            <div className="bg-[#6b9b4c]/20 text-[#6b9b4c] px-4 py-2 rounded-lg border border-[#6b9b4c]/30">
                                <span className="font-semibold">{exercise.time}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
