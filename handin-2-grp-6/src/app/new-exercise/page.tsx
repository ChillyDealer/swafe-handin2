import { Flex, Heading, TextField } from "@radix-ui/themes";

export default function NewExercise() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-full"
    >
      <Heading className=" w-full flex justify-center p-4" size="8">
        Create a New Exercise
      </Heading>
      <TextField.Root className="w-1/3">
        <TextField.Slot>Exercise name</TextField.Slot>
      </TextField.Root>
    </Flex>
  );
}
