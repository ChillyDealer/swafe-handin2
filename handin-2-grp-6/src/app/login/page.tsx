'use client';

import { useEffect } from 'react';
import { useAuth } from '@/app/hooks/auth';
import { LoginForm } from '@/app/login/components/login-form';
import { QuickLoginButtons } from '@/app/login/components/quick-login-buttons';
import { BackButton } from '@/app/login/components/back-button';

export default function LoginPage() {
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    login,
    quickLogin,
    checkExistingAuth,
  } = useAuth();

  useEffect(() => {
    checkExistingAuth();
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black overflow-hidden'>
      <BackButton />

      <div className='bg-[#2a2a2a] p-6 rounded-lg shadow-2xl w-full max-w-sm'>
        <h1 className='text-white text-2xl font-bold text-center mb-6'>
          LOGIN
        </h1>

        <LoginForm
          email={email}
          password={password}
          error={error}
          loading={loading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={login}
        />

        <QuickLoginButtons onQuickLogin={quickLogin} />
      </div>
    </div>
  );
}
