import {Flex, Text, TextField} from "@radix-ui/themes";
import {Lock, User} from "lucide-react";
import {PageComponent} from "@/app/_components/page-component";

export default function LoginPage() {
    return <PageComponent className="justify-center items-center">
        <Text>hej</Text>
        <Flex direction="column" className="gap-4 bg-red-400 w-80">
            <TextField.Root placeholder="E-mail">
                <TextField.Slot>
                    <User/>
                </TextField.Slot>
            </TextField.Root>
            <TextField.Root placeholder="Password">
                <TextField.Slot>
                    <Lock/>
                </TextField.Slot>
            </TextField.Root>
        </Flex>
    </PageComponent>
}