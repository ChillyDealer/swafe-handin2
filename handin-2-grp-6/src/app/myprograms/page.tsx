'use client';
import { PageComponent } from '../_components/page-component';
import NewProgram from './new-program';
('./new-exercise-popup');

export default function NewExercisePage() {
  return (
    <PageComponent className='flex flex-col items-center justify-center'>
      <NewProgram />
    </PageComponent>
  );
}
