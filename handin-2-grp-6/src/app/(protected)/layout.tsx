import React from 'react';
import { AuthService } from '@/app/services/auth.service';
import { Column } from '@/app/_components/column';
import { Navbar } from '@/app/_components/navbar';
import { Text } from '@radix-ui/themes';

interface Props {
  children: React.ReactNode;
}

export default async function ProtectedLayout(props: Props) {
  const { children } = props;

  const role = await AuthService.getRole();

  if (role === 'Manager' || role === 'PersonalTrainer') {
    return (
      <Column>
        <Navbar />
        {children}
      </Column>
    );
  }

  return (
    <Column className='items-center p-8'>
      <Text size='6'>Her må du sgu ikke være lille knejt</Text>
    </Column>
  );
}
