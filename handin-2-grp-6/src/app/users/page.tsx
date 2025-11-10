import {Flex} from "@radix-ui/themes";
import {UsersTable} from "@/app/users/_components/users-table";
import {Navbar} from "@/app/_components/navbar";

export default function UsersPage() {
    return <>
        <Navbar/>
        <Flex direction="column" className="p-8">
            <UsersTable/>
        </Flex>
    </>
}