'use client';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WorkoutProgram } from '../myworkouts/types';
import { getTrainerWorkoutPrograms } from '../_data/exercises-api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (program: WorkoutProgram) => void;
}

export function ProgramPickerModal({ isOpen, onClose, onSelect }: Props) {
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchPrograms();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTrainerWorkoutPrograms();
      setPrograms(data);
    } catch (err) {
      setError('Failed to load programs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div
        className='bg-[#2a2a2a] rounded-lg w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between p-4 border-b border-gray-700'>
          <h2 className='text-white text-lg font-semibold'>
            Select a Workout Program
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-white transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <div className='overflow-y-auto flex-1 p-4'>
          {loading && (
            <div className='text-gray-400 text-center py-8'>Loading...</div>
          )}

          {error && (
            <div className='text-red-400 text-center py-8'>{error}</div>
          )}

          {!loading && !error && programs.length === 0 && (
            <div className='text-gray-400 text-center py-8'>
              No programs found
            </div>
          )}

          {!loading && !error && programs.length > 0 && (
            <div className='flex flex-col gap-3'>
              {programs.map((program) => (
                <button
                  key={program.workoutProgramId}
                  onClick={() => {
                    onSelect(program);
                    onClose();
                  }}
                  className='bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded-md p-3 text-left transition-colors'
                >
                  <div className='text-white font-medium'>{program.name}</div>
                  <div className='text-gray-400 text-sm mt-1 line-clamp-2'>
                    {program.description}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
