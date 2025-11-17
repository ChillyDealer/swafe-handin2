'use client';

import { Separator } from "@radix-ui/themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/app/services/auth.service"

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoggedIn(!!AuthService.getToken());
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
        router.push("/");
    };

    return (
        <div className="flex flex-col">
            <div className="flex h-14 items-center justify-between p-4 bg-[#53659a]">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/favicon.ico" alt="icon" className="w-6 h-6" />
                    <p className="text-white font-bold text-lg cursor-pointer">Sigma Fitness</p>
                </Link>
                {isLoggedIn ? (
                    <button 
                        onClick={handleLogout}
                        className="text-white font-bold text-lg drop-shadow-md hover:drop-shadow-lg transition-all cursor-pointer mr-4"
                    >
                        Logout
                    </button>
                ) : (
                    <Link href="/login">
                        <button className="text-white font-bold text-lg drop-shadow-md hover:drop-shadow-lg transition-all cursor-pointer mr-4">
                            Login
                        </button>
                    </Link>
                )}
            </div>
            <Separator size="4"/>
        </div>
    );
}