import { Flex, Heading, TextField } from "@radix-ui/themes";
import { PageComponent } from "../_components/page-component";

export default function NewExercise() {
  return (
    <PageComponent>
      <div className="flex flex-col items-center justify-center">
        <Heading className="p-4" size="8">
          Create a New Exercise
        </Heading>
        <TextField.Root className="w-1/3">
          <TextField.Slot>Exercise name</TextField.Slot>
        </TextField.Root>
      </div>
    </PageComponent>
  );
}
