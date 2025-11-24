import { Text, TextField } from '@radix-ui/themes';
import { ChangeEvent, FC, ReactNode, useCallback } from 'react';
import { Column } from '@/app/_components/column';

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?:
    | 'number'
    | 'search'
    | 'time'
    | 'text'
    | 'hidden'
    | 'tel'
    | 'url'
    | 'email'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'password'
    | 'week';
  slot?: ReactNode;
}

export const InputField: FC<Props> = (props) => {
  const { value, onChange, label, placeholder, type, slot } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  );

  return (
    <Column className='w-full'>
      <Text size='2' className='opacity-80'>
        {label}
      </Text>
      <TextField.Root
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={type}
      >
        <TextField.Slot>{slot}</TextField.Slot>
      </TextField.Root>
    </Column>
  );
};
