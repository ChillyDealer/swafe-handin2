'use client';

import { Separator } from '@radix-ui/themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/app/services/auth.service';
import { Row } from '@/app/_components/row';
import { Column } from '@/app/_components/column';

export const Navbar = () => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string>();

  useEffect(() => {
    AuthService.getRole().then(setRole);
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(!!AuthService.getTokenSync());
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    setIsLoggedIn(false);
    router.push('/');
    router.refresh(); // Refresh to update server-side state
  };

  return (
    <Column>
      <Row className='h-14 items-center justify-between p-4 bg-[#53659a]'>
        <Link href='/' className='flex items-center gap-2'>
          <img src='/favicon.ico' alt='icon' className='w-6 h-6' />
          <p className='text-white font-bold text-lg cursor-pointer'>
            Sigma Fitness
          </p>
        </Link>
        <Row>
          {(role === 'Manager' || role === 'PersonalTrainer') && (
            <Link href='/users'>
              <button className='text-white font-bold text-lg drop-shadow-md hover:drop-shadow-lg transition-all cursor-pointer mr-4'>
                Users
              </button>
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className='text-white font-bold text-lg drop-shadow-md hover:drop-shadow-lg transition-all cursor-pointer mr-4'
            >
              Logout
            </button>
          ) : (
            <Link href='/login'>
              <button className='text-white font-bold text-lg drop-shadow-md hover:drop-shadow-lg transition-all cursor-pointer mr-4'>
                Login
              </button>
            </Link>
          )}
        </Row>
      </Row>
      <Separator size='4' />
    </Column>
  );
};
