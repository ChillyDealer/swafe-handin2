'use client';

import { InputField } from '@/app/_components/input/input-field';
import { useCallback, useState } from 'react';
import { postUser } from '@/app/_data/users-api';
import { Button } from '@radix-ui/themes';
import { useAuth } from '@/app/hooks/auth';

export default function CreateUserPage() {
  const { role, user } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await postUser({
        firstName,
        lastName,
        email,
        password,
        personalTrainerId:
          role === 'PersonalTrainer' ? user?.userId : undefined,
        accountType: role === 'Manager' ? 'PersonalTrainer' : 'Client',
      });
    },
    [email, firstName, lastName, password, role, user?.userId],
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
        Create user
      </Button>
    </form>
  );
}
