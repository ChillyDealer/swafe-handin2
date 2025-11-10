'use client';

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
    const token = AuthService.getToken();
    if (token) {
      const role = getUserRole(token);
      if (role === "Client") {
        router.push("/myworkouts");
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

  // default view
  return (
    <>
      <Navbar/>
      <div>I guess greg laver noget fedt her</div>
    </>
  );
}
