import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Navbar } from '@/app/_components/navbar';
import { decodeJwt } from '@/app/myworkouts/utils/jwt';
import { TrainerDashboard } from './components/trainer-dashboard';
import { AuthService } from '@/app/services/auth.service';

export default async function TrainerPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  if (!token) {
    redirect('/login');
  }

  const payload = decodeJwt(token);
  if (!payload || payload.Role !== 'PersonalTrainer') {
    return (
      <>
        <Navbar />
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center'>
          <div className='text-white text-xl'>You are not a trainer !</div>
        </div>
      </>
    );
  }
  //  fetch name
  const user = await AuthService.getCurrentUser();
  const trainerName = user
    ? `${user.firstName} ${user.lastName}`
    : payload.Name;

  return <TrainerDashboard trainerName={trainerName} />;
}
