'use client';

import { Flex } from '@radix-ui/themes';
import { InputField } from '@/app/_components/input/input-field';
import { useCallback, useState } from 'react';
import { postUser } from '@/app/_data/users-api';

export default function CreateUserPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [personalTrainerId, setPersonalTrainerId] = useState<number>();

  const handleSubmit = useCallback(() => {
    // TODO: do shit here
    postUser();
  }, []);

  return (
    <Flex direction='column' className='p-8'>
      <form onSubmit={handleSubmit}>
        <InputField
          label='First name'
          value={firstName}
          onChange={setFirstName}
        />
        <InputField label='Last name' value={lastName} onChange={setLastName} />
        <InputField label='Email' value={email} onChange={setEmail} />
        <InputField label='Password' value={password} onChange={setPassword} />
        <InputField
          label='Personal trainer ID'
          value={personalTrainerId}
          onChange={setPersonalTrainerId}
        />
      </form>
    </Flex>
  );
}
