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
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </>
    );
  }

  // Client view - show workouts
  if (userRole === "Client") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black">
          {/* Hero Header */}
          <div className="relative bg-[#53659a] py-20 px-8">
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
                Welcome Back! 💪
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Ready to crush your fitness goals today?
              </p>
            </div>
          </div>

          {/* My Workouts Banner */}
          <div className="bg-[#6b9b4c] py-8">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-wide uppercase text-center">
              My Workouts
            </h2>
          </div>

          {/* Workouts Grid */}
          <div className="py-12">
            <WorkoutsGrid />
          </div>
        </div>
      </>
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
