import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthService } from '@/app/services/auth.service';
import type { LoginRequest } from '@/app/_types/auth';
import { decodeJwt, getUserRole } from '@/app/myworkouts/utils/jwt';
import { User } from '@/app/_types/user';
import { getUserById } from '@/app/_data/users-api';

export function useAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const login = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const credentials: LoginRequest = { email, password };
      const response = await AuthService.login(credentials);
      const jwtInfo = decodeJwt(response.jwt);
      if (jwtInfo) {
        setUser(await getUserById(+jwtInfo.UserId));
        setRole(jwtInfo.Role);
      }

      const returnUrl = searchParams.get('returnUrl') || '/';
      router.push(returnUrl);
      router.refresh(); // server side fis
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(undefined);
    setRole('');
  };

  const quickLogin = (userEmail: string, userPassword: string) => {
    // fjern det her senere
    setEmail(userEmail);
    setPassword(userPassword);
  };

  const checkExistingAuth = () => {
    // redirect if log in
    const token = AuthService.getTokenSync();
    if (token) {
      const returnUrl = searchParams.get('returnUrl') || '/';
      router.push(returnUrl);
      return true;
    }
    return false;
  };

  const getRole = async () => {
    const token = await AuthService.getToken();

    if (!token) return null;

    return getUserRole(token);
  };

  return {
    email,
    password,
    role,
    user,
    error,
    loading,
    setEmail,
    setPassword,
    login,
    logout,
    quickLogin,
    checkExistingAuth,
  };
}
