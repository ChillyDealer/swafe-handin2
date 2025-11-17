'use client';

import { useEffect } from "react";
import type { WorkoutProgram, Exercise } from "../types";

interface Props {
    workout: WorkoutProgram;
    isOpen: boolean;
    onClose: () => void;
}

export function WorkoutModal({ workout, isOpen, onClose }: Props) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gradient-to-r from-[#53659a] to-[#5a6fa8] p-6 sticky top-0 z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                                {workout.name}
                            </h2>
                            <p className="text-white/90 text-sm mt-1">
                                {workout.description}
                            </p>
                            <div className="mt-3">
                                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {workout.exercises.length} {workout.exercises.length === 1 ? 'Exercise' : 'Exercises'}
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="ml-4 text-white/70 hover:text-white transition-colors text-2xl font-bold"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
                    <div className="space-y-4">
                        {workout.exercises.map((exercise, index) => (
                            <ExerciseCard key={exercise.exerciseId} exercise={exercise} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
    return (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-5 border border-gray-700/30 hover:border-[#6b9b4c]/30 transition-all">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#6b9b4c] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                        {exercise.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                        {exercise.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {exercise.sets !== null && exercise.sets > 0 && (
                            <div className="bg-[#53659a]/20 text-[#53659a] px-3 py-1.5 rounded-lg border border-[#53659a]/30 text-sm">
                                <span className="font-semibold">{exercise.sets}</span> Sets
                            </div>
                        )}
                        {exercise.repetitions > 0 && (
                            <div className="bg-[#53659a]/20 text-[#53659a] px-3 py-1.5 rounded-lg border border-[#53659a]/30 text-sm">
                                <span className="font-semibold">{exercise.repetitions}</span> Reps
                            </div>
                        )}
                        {exercise.time && (
                            <div className="bg-[#6b9b4c]/20 text-[#6b9b4c] px-3 py-1.5 rounded-lg border border-[#6b9b4c]/30 text-sm">
                                <span className="font-semibold">{exercise.time}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
