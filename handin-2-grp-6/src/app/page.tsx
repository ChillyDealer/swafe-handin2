"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/_components/navbar";
import { AuthService } from "@/app/services/auth.service";
import { getUserRole } from "@/app/myworkouts/utils/jwt";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = AuthService.getTokenSync();
    if (token) {
      const role = getUserRole(token);
      if (role === "Client") {
        router.push("/myworkouts");
        return;
      }
      if (role === "PersonalTrainer") {
        router.push("/trainer");
        return;
      }
    }
    setIsLoading(false);
  };

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block bg-gradient-to-r from-green-600 to-green-900 text-white font-black px-6 py-2 mb-6 uppercase tracking-wider text-sm transform -rotate-2 shadow-lg">
                ✓ SIGMA GRINDSET APPROVED
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 uppercase leading-tight">
                TRANSFORM FROM<br />
                <span className="bg-gradient-to-r from-gray-500 to-gray-600 bg-clip-text text-transparent">BETA</span>
                {" "}TO{" "}
                <span className="bg-gradient-to-r from-amber-500 to-yellow-700 bg-clip-text text-transparent">CHAD</span>
              </h1>
              <p className="text-2xl lg:text-3xl font-bold text-gray-700 mb-4">
                NO EXCUSES. ONLY GAINS.
              </p>
            </div>

            <div className="flex-1 max-w-sm">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVhQ7Bt41VU1Hca1GHVtGWZ83aItZl2eMLw&s"
                alt="idk"
                className="w-full h-auto rounded-2xl shadow-2xl transform -scale-x-100"
              />
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
              Which One Are You?
            </h2>
            <img
              src="https://preview.redd.it/the-virgin-modern-lifter-vs-the-chad-old-school-bodybuilder-v0-1ztteidjt3gb1.png?auto=webp&s=1fc2954e0ba98dc67405db3f5c2927ca6298813d"
              alt="chad"
              className="w-full max-w-3xl h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
