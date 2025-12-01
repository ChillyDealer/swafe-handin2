'use client';
import { useEffect, useState } from 'react';
import { PageComponent } from '../_components/page-component';
import { getTrainerWorkoutPrograms } from '../_data/exercises-api';
import { WorkoutProgram } from '../myworkouts/types';

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
      <div>My programs: </div>
      <ul>
        {programs.map((program) => (
          <li key={program.workoutProgramId}>{program.name}</li>
        ))}
      </ul>
    </PageComponent>
  );
}
