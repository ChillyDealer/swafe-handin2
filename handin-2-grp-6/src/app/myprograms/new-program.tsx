'use client';

import { useEffect, useState } from 'react';
import { Client } from '../myworkouts/types';
import { useRouter } from 'next/navigation';
import {
  getClients,
  createWorkoutProgram,
  CreateWorkoutProgram,
} from '../_data/programs-api';
import { FileText, Users, Check, ChevronDown, X , ArrowLeft} from 'lucide-react';

export default function NewProgram() {
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const router = useRouter();

  const loadClients = async () => {
    try {
      const clientsData = await getClients();
      setClients(clientsData);
    } catch (error) {
      console.error('failed get clients:', error);
    }
  };

  const toggleClient = (client: Client) => {
    setSelectedClients((prev) => {
      const exists = prev.find((c) => c.userId === client.userId);
      if (exists) {
        return prev.filter((c) => c.userId !== client.userId);
      }
      return [...prev, client];
    });
  };

  const removeClient = (clientId: number) => {
    setSelectedClients((prev) => prev.filter((c) => c.userId !== clientId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedClients.length === 0) {
      alert('select client');
      return;
    }

    try {
      for (const client of selectedClients) {
        const body: CreateWorkoutProgram = {
          name: programName,
          description: programDescription,
          clientId: client.userId,
        };
        await createWorkoutProgram(body);
      }

      setSuccessMessage(
        `"${programName}" created for ${selectedClients.length} clients`,
      );
      setProgramName('');
      setProgramDescription('');
      setSelectedClients([]);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch {
      alert('faiel create program');
    }
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
      <div className='w-full max-w-lg p-4'>
        <h1 className='text-white text-2xl font-bold text-center mb-6'>
          Create a new workout program
        </h1>

        {successMessage && (
          <div className='flex items-center gap-2 bg-[#6b9b4c] text-white px-4 py-2 rounded-md mb-4'>
            <Check size={18} />
            <span className='text-sm'>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-white text-xs'>Program Name</label>
            <div className='flex items-center bg-[#3a3a3a] rounded-md px-3 py-2 gap-2'>
              <FileText className='text-gray-400' size={18} />
              <input
                type='text'
                placeholder='e.g. Easy Level'
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
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
                placeholder='What is this program about...'
                value={programDescription}
                onChange={(e) => setProgramDescription(e.target.value)}
                className='bg-transparent mt-1 text-white text-sm outline-none flex-1 resize-none min-h-20'
                required
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white text-xs'>Assign to Clients</label>

            {selectedClients.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-2'>
                {selectedClients.map((client) => (
                  <div
                    key={client.userId}
                    className='flex items-center gap-2 bg-[#6b9b4c]/30 border border-[#6b9b4c]/50 rounded-full px-3 py-1'
                  >
                    <span className='text-white text-sm'>
                      {client.firstName} {client.lastName}
                    </span>
                    <button
                      type='button'
                      onClick={() => removeClient(client.userId)}
                      className='text-white/70 hover:text-white'
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* dropdown clients */}
            <div className='relative'>
              <button
                type='button'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='w-full flex items-center justify-between bg-[#3a3a3a] rounded-md px-3 py-2 text-left'
              >
                <div className='flex items-center gap-2'>
                  <Users className='text-gray-400' size={18} />
                  <span className='text-gray-400 text-sm'>
                    {selectedClients.length === 0
                      ? 'Choose clients'
                      : `${selectedClients.length} selected`}
                  </span>
                </div>
                <ChevronDown
                  className={`text-gray-400 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  size={18}
                />
              </button>

              {isDropdownOpen && (
                <div className='absolute z-20 w-full mt-2 bg-[#2a2a2a] border border-white/10 rounded-md shadow-xl max-h-48 overflow-y-auto'>
                  {clients.length === 0 ? (
                    <div className='px-4 py-3 text-gray-400 text-sm'>
                      No clients found
                    </div>
                  ) : (
                    clients.map((client) => {
                      const isSelected = selectedClients.some(
                        (c) => c.userId === client.userId,
                      );
                      return (
                        <button
                          key={client.userId}
                          type='button'
                          onClick={() => toggleClient(client)}
                          className={`w-full flex items-center justify-between px-4 py-2 hover:bg-white/10 transition-colors ${
                            isSelected ? 'bg-[#6b9b4c]/20' : ''
                          }`}
                        >
                          <div className='text-left'>
                            <div className='text-white text-sm'>
                              {client.firstName} {client.lastName}
                            </div>
                          </div>
                          {isSelected && (
                            <Check className='text-[#6b9b4c]' size={16} />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            type='submit'
            className='bg-[#6b9b4c] hover:bg-[#5a8a3b] text-white font-semibold py-2.5 rounded-md transition-colors mt-2'
          >
            CREATE PROGRAM
          </button>
        </form>
      </div>
    </div>
  );
}
