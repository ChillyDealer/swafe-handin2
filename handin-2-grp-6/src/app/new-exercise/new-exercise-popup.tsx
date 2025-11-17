'use client';
import { Clock, Dumbbell, FileText, Hash } from 'lucide-react';
import { useState } from 'react';
import { Exercise } from '../myworkouts/types';

export default function NewExercisePopup({
  workoutProgramId,
}: {
  workoutProgramId: number;
}) {
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
    <div className='fixed inset-0 flex items-center justify-center bg-black overflow-hidden'>
      <div className='w-full max-w-md'>
        <h1 className='text-white text-2xl font-bold text-center mb-8'>
          Create a New Exercise for program:
          {/* {workoutProgramId} */}
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* Exercise Name */}
          <div className='flex flex-col gap-2'>
            <label className='text-white text-xs'>Exercise Name</label>
            <div className='flex items-center bg-[#3a3a3a] rounded-md px-3 py-2 gap-2'>
              <Dumbbell className='text-gray-400' size={18} />
              <input
                type='text'
                placeholder='Exercise name'
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                className='bg-transparent text-white text-sm outline-none flex-1'
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className='flex flex-col gap-2'>
            <label className='text-white text-xs'>Description</label>
            <div className='flex items-start bg-[#3a3a3a] rounded-md px-3 py-2 gap-2'>
              <FileText className='text-gray-400 mt-1' size={18} />
              <textarea
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='bg-transparent text-white text-sm outline-none flex-1 resize-none min-h-20'
                required
              />
            </div>
          </div>

          {/* Reps */}
          <div className='flex flex-col gap-2'>
            <label className='text-white text-xs'>Reps</label>
            <div className='flex items-center bg-[#3a3a3a] rounded-md px-3 py-2 gap-2'>
              <Hash className='text-gray-400' size={18} />
              <input
                type='number'
                placeholder='Number of reps'
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className='bg-transparent text-white text-sm outline-none flex-1'
                required
              />
            </div>
          </div>

          {/* Sets or Duration */}
          <div className='flex flex-col gap-2'>
            <label className='text-white text-xs'>
              {usingSets ? 'Sets' : 'Duration (mins)'}
            </label>
            <div className='flex items-center bg-[#3a3a3a] rounded-md px-3 py-2 gap-2'>
              {usingSets ? (
                <Hash className='text-gray-400' size={18} />
              ) : (
                <Clock className='text-gray-400' size={18} />
              )}
              <input
                type='number'
                placeholder={
                  usingSets ? 'Number of sets' : 'Duration in minutes'
                }
                value={setsOrDuration}
                onChange={(e) => setSetsOrDuration(e.target.value)}
                className='bg-transparent text-white text-sm outline-none flex-1'
                required
              />
            </div>
          </div>

          {/* Radio Group */}
          <div className='flex flex-col gap-2'>
            <label className='text-white text-xs'>Type</label>
            <div className='flex gap-4'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  name='exerciseType'
                  value='sets'
                  checked={usingSets}
                  onChange={() => setUsingSets(true)}
                  className='w-4 h-4 accent-[#6b9b4c]'
                />
                <span className='text-white text-sm'>Sets</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  name='exerciseType'
                  value='time'
                  checked={!usingSets}
                  onChange={() => setUsingSets(false)}
                  className='w-4 h-4 accent-[#6b9b4c]'
                />
                <span className='text-white text-sm'>Time</span>
              </label>
            </div>
          </div>

          <button
            type='submit'
            className='bg-[#6b9b4c] hover:bg-[#5a8a3b] text-white font-semibold py-2.5 rounded-md transition-colors mt-2'
          >
            CREATE EXERCISE
          </button>
        </form>
      </div>
    </div>
  );
}
