'use client';

import { useState } from "react";
import type { WorkoutProgram } from "../types";
import { WorkoutModal } from "./workout-modal";

interface Props {
    workout: WorkoutProgram;
}

export function WorkoutCard({ workout }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const exerciseCount = workout.exercises?.length || 0;
    
    return (
        <>
            <div 
                onClick={() => setIsModalOpen(true)}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#53659a]/20 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-[#53659a]/50 hover:-translate-y-2"
            >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#53659a]/0 to-[#6b9b4c]/0 group-hover:from-[#53659a]/10 group-hover:to-[#6b9b4c]/10 transition-all duration-300"></div>
            
            {/* Image Placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-[#53659a]/20 to-[#2a2a2a] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300 relative z-10">💪</span>
            </div>
            
            {/* Card Content */}
            <div className="relative p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white text-xl font-bold uppercase tracking-wide group-hover:text-[#6b9b4c] transition-colors duration-300">
                        {workout.name}
                    </h3>
                    <div className="bg-[#6b9b4c]/20 text-[#6b9b4c] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        {exerciseCount} {exerciseCount === 1 ? 'Exercise' : 'Exercises'}
                    </div>
                </div>
                {workout.description && (
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {workout.description}
                    </p>
                )}
                
                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsModalOpen(true);
                        }}
                        className="w-full bg-gradient-to-r from-[#53659a] to-[#6b9b4c] text-white font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-[#53659a]/30 transition-all duration-300 text-sm uppercase tracking-wider"
                    >
                        View Exercises
                    </button>
                </div>
            </div>
        </div>

        <WorkoutModal 
            workout={workout}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
        </>
    );
}
