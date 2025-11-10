'use client';

import { useEffect, useState } from "react";
import { Navbar } from "@/app/_components/navbar";
import { AuthService } from "@/app/services/auth.service";
import { getUserRole } from "@/app/myworkouts/utils/jwt";
import { WorkoutsGrid } from "@/app/myworkouts/components/workouts-grid";

export default function Home() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = AuthService.getToken();
    if (token) {
      const role = getUserRole(token);
      setUserRole(role);
    } else {
      setUserRole(null);
    }
    setIsLoading(false);
  };

  // Listen for storage changes (logout events)
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case logout happens in same tab
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </>
    );
  }

  // Client view - show workouts
  if (userRole === "Client") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-1">
        <Navbar />
        {/* Hero Section with glass morphism */}
        <div className="px-8 py-20 relative">
          {/* Animated background accent - BRIGHTER */}
          <div className="fixed top-0 right-0 w-96 h-96 bg-[#53659a]/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="fixed bottom-0 left-0 w-96 h-96 bg-[#6b9b4c]/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Glass card wrapper */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="inline-flex items-center gap-2 bg-[#6b9b4c]/30 border border-[#6b9b4c]/50 rounded-full px-4 py-2 mb-6 shadow-lg shadow-[#6b9b4c]/20">
                <span className="w-2 h-2 bg-[#6b9b4c] rounded-full animate-pulse shadow-lg shadow-[#6b9b4c]"></span>
                <span className="text-[#6b9b4c] font-bold uppercase tracking-wider text-sm">Active Session</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                Ready to Train? 💪
              </h1>
              
              <p className="text-gray-200 text-xl mb-8 max-w-2xl leading-relaxed">
                Your personalized workout programs are ready. Let's make today count!
              </p>

              {/* Quick stats - BRIGHTER */}
              <div className="flex gap-6 flex-wrap">
                <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 hover:bg-white/15 transition-all shadow-lg">
                  <div className="text-3xl font-black">🔥</div>
                  <div className="text-gray-300 text-sm mt-1 font-medium">Keep the streak</div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 hover:bg-white/15 transition-all shadow-lg">
                  <div className="text-3xl font-black">⚡</div>
                  <div className="text-gray-300 text-sm mt-1 font-medium">Stay motivated</div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 hover:bg-white/15 transition-all shadow-lg">
                  <div className="text-3xl font-black">🎯</div>
                  <div className="text-gray-300 text-sm mt-1 font-medium">Reach your goals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workouts Section with glass morphism */}
        <div className="px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Glass header card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Your Workout Programs</h2>
                  <p className="text-gray-300">Click any program to view exercises</p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-[#53659a]/30 border border-[#53659a]/50 rounded-xl px-4 py-2 shadow-lg shadow-[#53659a]/20">
                    <span className="text-[#53659a] font-semibold text-sm">All Active</span>
                  </div>
                </div>
              </div>
            </div>
            
            <WorkoutsGrid />
          </div>
        </div>
      </div>
    );
  }

  // Default view - keep Greg's original placeholder
  return (
    <>
      <Navbar/>
      <div>I guess greg laver noget fedt her</div>
    </>
  );
}
