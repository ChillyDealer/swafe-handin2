'use client';

import { useRouter } from "next/navigation";
import { Navbar } from "@/app/_components/navbar";

interface TrainerDashboardProps {
    trainerName: string;
}

export function TrainerDashboard({ trainerName }: TrainerDashboardProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-1">
            <Navbar />
            <div className="px-8 py-16 relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
                        <div className="inline-flex items-center gap-2 bg-[#53659a]/30 border border-[#53659a]/50 rounded-full px-4 py-2 mb-6 shadow-lg shadow-[#53659a]/20">
                            <span className="w-2 h-2 bg-[#53659a] rounded-full animate-pulse shadow-lg shadow-[#53659a]"></span>
                            <span className="text-[#53659a] font-bold uppercase tracking-wider text-sm">{trainerName || "Trainer"}</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                            Trainer
                        </h1>

                        <p className="text-gray-200 text-xl max-w-2xl leading-relaxed">
                            See clients and manga workouts.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 shadow-xl">
                        <h2 className="text-3xl font-black text-white mb-4">Client Pages</h2>
                        <p className="text-gray-300 mb-6">Manage client information.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => router.push('idk')}
                                className="bg-[#6b9b4c]/30 hover:bg-[#6b9b4c]/50 border border-[#6b9b4c]/50 hover:border-[#6b9b4c] rounded-xl px-6 py-6 transition-all shadow-lg hover:shadow-[#6b9b4c]/30 text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">➕</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#6b9b4c] transition-colors">Create Client</h3>
                                        <p className="text-gray-300 text-sm">Add a new clients</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => router.push('/users')}
                                className="bg-[#53659a]/30 hover:bg-[#53659a]/50 border border-[#53659a]/50 hover:border-[#53659a] rounded-xl px-6 py-6 transition-all shadow-lg hover:shadow-[#53659a]/30 text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">🕵️</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#53659a] transition-colors">View Clients</h3>
                                        <p className="text-gray-300 text-sm">See all clients</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 shadow-xl">
                        <h2 className="text-3xl font-black text-white mb-4">Workout Pages</h2>
                        <p className="text-gray-300 mb-6">Manage workout plans.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => router.push('idk')}
                                className="bg-[#6b9b4c]/30 hover:bg-[#6b9b4c]/50 border border-[#6b9b4c]/50 hover:border-[#6b9b4c] rounded-xl px-6 py-6 transition-all shadow-lg hover:shadow-[#6b9b4c]/30 text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">📝</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#6b9b4c] transition-colors">Create Program</h3>
                                        <p className="text-gray-300 text-sm">Make new programs for clients.</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => router.push('idk')}
                                className="bg-[#53659a]/30 hover:bg-[#53659a]/50 border border-[#53659a]/50 hover:border-[#53659a] rounded-xl px-6 py-6 transition-all shadow-lg hover:shadow-[#53659a]/30 text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">📚</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#53659a] transition-colors">View Programs</h3>
                                        <p className="text-gray-300 text-sm">See all programs</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl mb-6">
                        <h2 className="text-3xl font-black text-white mb-4">Exercise Page</h2>
                        <p className="text-gray-300 mb-6">Mangage excersises for workout</p>
                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => router.push('/new-exercise')}
                                className="bg-[#6b9b4c]/30 hover:bg-[#6b9b4c]/50 border border-[#6b9b4c]/50 hover:border-[#6b9b4c] rounded-xl px-6 py-6 transition-all shadow-lg hover:shadow-[#6b9b4c]/30 text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">💪</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#6b9b4c] transition-colors">Add Excersise</h3>
                                        <p className="text-gray-300 text-sm">Make new excersise to workouts.</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
