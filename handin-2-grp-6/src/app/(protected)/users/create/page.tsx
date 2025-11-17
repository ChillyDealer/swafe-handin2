import { Flex } from '@radix-ui/themes';
import { InputField } from '@/app/_components/input/input-field';

export default function CreateUserPage() {
  return (
    <Flex direction='column' className='p-8'>
      <form>
        <InputField />
      </form>
    </Flex>
  );
}
