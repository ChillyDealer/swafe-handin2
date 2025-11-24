'use client';

import { InputField } from '@/app/_components/input/input-field';
import { useCallback, useEffect, useState } from 'react';
import { postUser } from '@/app/_data/users-api';
import { Button } from '@radix-ui/themes';
import { AuthService } from '@/app/services/auth.service';
import { User } from '@/app/_types/user';
import { useRouter } from 'next/navigation';

export default function CreateUserPage() {
  const { push } = useRouter();

  const [role, setRole] = useState<string>();
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AuthService.getRole().then(setRole);
    AuthService.getCurrentUser().then(setCurrentUser);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const resp = await postUser({
        firstName,
        lastName,
        email,
        password,
        personalTrainerId:
          role === 'PersonalTrainer' ? currentUser?.userId : undefined,
        accountType: role === 'Manager' ? 'PersonalTrainer' : 'Client',
      });

      if (resp.ok) {
        push('/users');
        return;
      }

      console.warn('User post failed', resp);
    },
    [firstName, lastName, email, password, role, currentUser?.userId, push],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-[500px] p-8 gap-4 m-auto'
    >
      <InputField
        label='First name'
        value={firstName}
        onChange={setFirstName}
      />
      <InputField label='Last name' value={lastName} onChange={setLastName} />
      <InputField label='Email' value={email} onChange={setEmail} />
      <InputField label='Password' value={password} onChange={setPassword} />
      <Button size='4' type='submit'>
        {`Create ${role === 'Manager' ? 'personal trainer' : 'client'}`}
      </Button>
    </form>
  );
}
