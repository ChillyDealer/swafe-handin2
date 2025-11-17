import {Flex} from "@radix-ui/themes";
import {UsersTable} from "@/app/(protected)/users/_components/users-table";

export default function UsersPage() {
    return (
        <Flex direction="column" className="p-8">
            <UsersTable/>
        </Flex>
    );
}