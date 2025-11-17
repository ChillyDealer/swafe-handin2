import { TextField } from '@radix-ui/themes';
import { FileText } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface Props {
  slot: ReactNode;
}

export const InputField: FC<Props> = (props) => {
  const { slot } = props;

  return (
    <TextField.Root placeholder='Search the docs…'>
      <TextField.Slot>{slot}</TextField.Slot>
    </TextField.Root>
  );

  // return (
  //   <div className='flex flex-col gap-2'>
  //     <label className='text-white text-xs'>Description</label>
  //     <div className='flex items-start bg-[#3a3a3a] rounded-md px-3 py-2 gap-2'>
  //       <FileText className='text-gray-400 mt-1' size={18} />
  //       <textarea
  //         placeholder='Description'
  //         value={description}
  //         onChange={(e) => setDescription(e.target.value)}
  //         className='bg-transparent text-white text-sm outline-none flex-1 resize-none min-h-20'
  //         required
  //       />
  //     </div>
  //   </div>
  // );
};
