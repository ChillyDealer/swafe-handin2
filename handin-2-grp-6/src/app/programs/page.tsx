'use client';
import { useEffect, useState } from 'react';
import { PageComponent } from '../_components/page-component';
import { getTrainerWorkoutPrograms } from '../_data/exercises-api';
import { WorkoutProgram } from '../myworkouts/types';
import { Navbar } from '../_components/navbar';
import { Column } from '../_components/column';
import { WorkoutCard } from '../myworkouts/components/workout-card';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);

  async function fetchPrograms() {
    const data = await getTrainerWorkoutPrograms();
    // konverter til array af WorkoutPrograms
    const workoutPrograms = data as WorkoutProgram[];
    setPrograms(workoutPrograms);
  }

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <PageComponent>
      <Navbar />
      <Column className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center w-full'>
        <h1 className='text-white text-2xl font-bold text-center mb-6'>
          My programs:{' '}
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
          {programs.map((program) => (
            <WorkoutCard key={program.workoutProgramId} workout={program} />
          ))}
        </div>
      </Column>
    </PageComponent>
  );
}
