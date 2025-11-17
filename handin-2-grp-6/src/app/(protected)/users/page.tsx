import {Flex} from "@radix-ui/themes";
import {Navbar} from "@/app/_components/navbar";
import {UsersTable} from "@/app/(protected)/users/_components/users-table";

export default function UsersPage() {
    return <>
        <Navbar/>
        <Flex direction="column" className="p-8">
            <UsersTable/>
        </Flex>
    </>
}