'use client';
import { Dumbbell, FileText, Hash, Clock } from 'lucide-react';
import { PageComponent } from '../_components/page-component';
import { useState } from 'react';
import { Exercise } from '../myworkouts/types';
import NewExercisePopup from './new-exercise-popup';

export default function NewExercisePage(workoutProgramId: number) {
  const [usingSets, setUsingSets] = useState<boolean>(true);
  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');
  const [reps, setReps] = useState('');
  const [setsOrDuration, setSetsOrDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const newExercise: Exercise = {
      exerciseId: 0, // This would be set by the backend
      groupId: '', // Set appropriately
      name: exerciseName,
      description: description,
      sets: usingSets ? parseInt(setsOrDuration) : null,
      repetitions: parseInt(reps),
      time: usingSets ? '' : `${setsOrDuration} mins`,
      workoutProgramId: 0, // Set appropriately
      personalTrainerId: 0, // Set appropriately
    };
    console.log({ exerciseName, description, reps, setsOrDuration, usingSets });
  };

  return (
    <PageComponent className='flex flex-col items-center justify-center'>
      <NewExercisePopup workoutProgramId={19} personalTrainerId={36} />
      {/* 19 og 36 er bare for det der workout program der er i backenden i forvejen */}
    </PageComponent>
  );
}
