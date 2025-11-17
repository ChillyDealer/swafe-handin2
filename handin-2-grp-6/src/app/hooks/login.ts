import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthService } from "@/app/services/auth.service";
import type { LoginRequest } from "@/app/_types/auth";

export function useAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const login = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        setError("");
        setLoading(true);

        try {
            const credentials: LoginRequest = { email, password };
            const response = await AuthService.login(credentials);
            
            AuthService.saveToken(response.jwt);
            
            const returnUrl = searchParams.get("returnUrl") || "/";
            router.push(returnUrl);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Login failed";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const quickLogin = (userEmail: string, userPassword: string) => { // fjern det her senere
        setEmail(userEmail);
        setPassword(userPassword);
    };

    const checkExistingAuth = () => { // redirect if log in
        const token = AuthService.getToken();
        if (token) {
            const returnUrl = searchParams.get("returnUrl") || "/";
            router.push(returnUrl);
            return true;
        }
        return false;
    };

    return { 
        email,
        password,
        error,
        loading,
        setEmail,
        setPassword,
        login,
        quickLogin,
        checkExistingAuth,
    };
}
