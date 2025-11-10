'use client';

import { Navbar } from "@/app/_components/navbar";
import { WorkoutsGrid } from "./components/workouts-grid";

export default function MyWorkoutsPage() {
    return (
        <>
            <Navbar />
            
            <div className="min-h-screen bg-black">
                {/* Hero Header */}
                <div className="bg-gradient-to-b from-[#53659a] to-[#3a4569] py-16 px-8">
                    <h1 className="text-white text-5xl font-bold text-center">
                        Welcome to Your Fitness Journey
                    </h1>
                </div>

                {/* My Workouts Banner */}
                <div className="bg-[#6b9b4c] py-6">
                    <h2 className="text-white text-3xl font-bold text-center tracking-wide uppercase">
                        My Workouts
                    </h2>
                </div>

                {/* Workouts Grid */}
                <WorkoutsGrid />
            </div>
        </>
    );
}
