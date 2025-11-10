'use client';

import { useEffect, useState } from "react";
import { Navbar } from "@/app/_components/navbar";
import { AuthService } from "@/app/services/auth.service";
import { getUserRole, getUserName } from "@/app/myworkouts/utils/jwt";
import { WorkoutsGrid } from "@/app/myworkouts/components/workouts-grid";

export default function Home() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = AuthService.getToken();
    if (token) {
      const role = getUserRole(token);
      setUserRole(role);
      
      // fetch user details
      try {
        const user = await AuthService.getCurrentUser(token);
        setUserName(`${user.firstName} ${user.lastName}`);
        setUserId(user.userId.toString());
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserName("User");
        setUserId("");
      }
    } else {
      setUserRole(null);
      setUserName("");
      setUserId("");
    }
    setIsLoading(false);
  };

  // check for logout event
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // check if logged out in same tab
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

  // show workouts
  if (userRole === "Client") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-1">
        <Navbar />
        <div className="px-8 py-20 relative">
          {/* animated blur */}
          <div className="fixed top-0 right-0 w-96 h-96 bg-[#53659a]/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="fixed bottom-0 left-0 w-96 h-96 bg-[#6b9b4c]/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* glass wrapper */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="inline-flex items-center gap-2 bg-[#6b9b4c]/30 border border-[#6b9b4c]/50 rounded-full px-4 py-2 mb-6 shadow-lg shadow-[#6b9b4c]/20">
                <span className="w-2 h-2 bg-[#6b9b4c] rounded-full animate-pulse shadow-lg shadow-[#6b9b4c]"></span>
                <span className="text-[#6b9b4c] font-bold uppercase tracking-wider text-sm">{userName || "User"}</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                Klar til at tæske børn? 💪
              </h1>
              
              <p className="text-gray-200 text-xl mb-8 max-w-2xl leading-relaxed">
                Personalized workout programs just for you, provided by your trainer.
              </p>

              <div className="flex gap-6 flex-wrap">
                <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 hover:bg-white/15 transition-all shadow-lg">
                  <div className="text-3xl font-black">🔥</div>
                  <div className="text-gray-300 text-sm mt-1 font-medium">Keep the heat</div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 hover:bg-white/15 transition-all shadow-lg">
                  <div className="text-3xl font-black">🚬</div>
                  <div className="text-gray-300 text-sm mt-1 font-medium">500 cigarettes</div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 hover:bg-white/15 transition-all shadow-lg">
                  <div className="text-3xl font-black">🎯</div>
                  <div className="text-gray-300 text-sm mt-1 font-medium">Hit your goals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pb-20">
          <div className="max-w-7xl mx-auto">
           
            {/* glass border */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Your Current Workout Programs</h2>
                  <p className="text-gray-300">Click the card to view your exercises</p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-[#53659a]/30 border border-[#53659a]/50 rounded-xl px-4 py-2 shadow-lg shadow-[#53659a]/20">
                    <span className="text-[#53659a] font-semibold text-sm">UserID: {userId}</span>
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

  return (
    <>
      <Navbar/>
      <div>I guess greg laver noget fedt her</div>
    </>
  );
}
