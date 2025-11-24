'use client';
import { Dumbbell, FileText, Hash, Clock, ChevronUp, ChevronDown, ArrowLeft, FolderOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { WorkoutProgram } from '../myworkouts/types';
import { CreateExercise, postExercise } from '../_data/exercises-api';
import { ProgramPickerModal } from './program-picker-modal';

export default function NewExercisePopup() {
  const router = useRouter();
  const [usingSets, setUsingSets] = useState<boolean>(true);
  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');
  const [reps, setReps] = useState('');
  const [setsOrDuration, setSetsOrDuration] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);

  const handleProgramSelect = (program: WorkoutProgram) => {
    setSelectedProgram(program);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProgram) {
      alert('select program first!');
      return;
    }

    const body: CreateExercise = {
      name: exerciseName,
      description: description,
      sets: usingSets ? parseInt(setsOrDuration) : null,
      repetitions: parseInt(reps),
      time: usingSets ? '' : `${setsOrDuration} mins`,
    };
    postExercise(selectedProgram.workoutProgramId, body);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black overflow-hidden'>
      <button
        onClick={() => router.back()}
        className='absolute top-4 left-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2'
      >
        <ArrowLeft size={20} strokeWidth={2} />
        <span className='text-sm'>Go back</span>
      </button>
      <div className='w-full max-w-md'>
        <h1 className='text-white text-2xl font-bold text-center mb-4'>
          Create a new exercise for program:
        </h1>

        <button
          type='button'
          onClick={() => setIsPickerOpen(true)}
          className='flex items-center justify-center gap-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-gray-300 hover:text-white py-2 px-4 rounded-md transition-colors mb-4 w-full'
        >
          <FolderOpen size={16} />
          <span className='text-sm'>
            {selectedProgram ? selectedProgram.name : 'Select a program'}
          </span>
        </button>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-white text-xs'>Exercise Name</label>
            <div className='flex items-center bg-[#3a3a3a] rounded-md px-3 py-2 gap-2'>
              <Dumbbell className='text-gray-400' size={18} />
              <input
                type='text'
                placeholder='excersise'
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                className='bg-transparent text-white text-sm outline-none flex-1'
                required
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white text-xs'>Description</label>
            <div className='flex items-start bg-[#3a3a3a] rounded-md px-3 py-2 gap-2'>
              <FileText className='text-gray-400 mt-1' size={18} />
              <textarea
                placeholder='What is this exercise about...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='bg-transparent text-white text-sm outline-none flex-1 mt-1 resize-none min-h-20'
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
                className='bg-transparent text-white text-sm outline-none flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                min='0'
                required
              />
              <div className='flex flex-col'>
                <button
                  type='button'
                  onClick={() => setReps(String(Math.max(0, (parseInt(reps) || 0) + 1)))}
                  className='text-gray-400 hover:text-[#6b9b4c] transition-colors'
                >
                  <ChevronUp size={18} strokeWidth={3} />
                </button>
                <button
                  type='button'
                  onClick={() => setReps(String(Math.max(0, (parseInt(reps) || 0) - 1)))}
                  className='text-gray-400 hover:text-[#6b9b4c] transition-colors'
                >
                  <ChevronDown size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

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
                className='bg-transparent text-white text-sm outline-none flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                min='0'
                required
              />
              <div className='flex flex-col'>
                <button
                  type='button'
                  onClick={() => setSetsOrDuration(String(Math.max(0, (parseInt(setsOrDuration) || 0) + 1)))}
                  className='text-gray-400 hover:text-[#6b9b4c] transition-colors'
                >
                  <ChevronUp size={18} strokeWidth={3} />
                </button>
                <button
                  type='button'
                  onClick={() => setSetsOrDuration(String(Math.max(0, (parseInt(setsOrDuration) || 0) - 1)))}
                  className='text-gray-400 hover:text-[#6b9b4c] transition-colors'
                >
                  <ChevronDown size={18} strokeWidth={3} />
                </button>
              </div>
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

      <ProgramPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleProgramSelect}
      />
    </div>
  );
}
