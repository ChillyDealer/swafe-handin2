import { Flex, Heading, RadioGroup, TextField } from "@radix-ui/themes";
import { PageComponent } from "../_components/page-component";
import { Column } from "../_components/column";
import { Row } from "../_components/row";

export default function NewExercise() {
  let usingSets: boolean = true;
  return (
    <PageComponent className="flex flex-col items-center justify-center">
      <Column>
        <Heading className="p-4 text-center" size="8">
          Create a New Exercise
        </Heading>
        <TextField.Root className="w-1/3 mx-auto">
          <TextField.Slot>Exercise name</TextField.Slot>
        </TextField.Root>
        <Row className="items-center">
          {/* 3 text fields, hvor den første er større end de andre 2 */}
          <TextField.Root className="flex-2">
            <TextField.Slot>Description</TextField.Slot>
          </TextField.Root>
          <TextField.Root className="flex-1">
            <TextField.Slot>Reps</TextField.Slot>
          </TextField.Root>
          <TextField.Root className="flex-1">
            <TextField.Slot>
              {usingSets ? "Sets" : "Duration (mins)"}
            </TextField.Slot>
          </TextField.Root>
          {/* Radio group med time og sets som muligheder */}
          <Column>
            <RadioGroup.Root>
              <RadioGroup.Item value="sets" id="sets">
                Sets
              </RadioGroup.Item>
              <RadioGroup.Item value="time" id="time">
                Time
              </RadioGroup.Item>
            </RadioGroup.Root>
          </Column>
        </Row>
      </Column>
    </PageComponent>
  );
}
