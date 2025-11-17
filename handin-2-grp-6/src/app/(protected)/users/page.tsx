import {Button, Flex, Text} from "@radix-ui/themes";
import {UsersTable} from "@/app/(protected)/users/_components/users-table";
import Link from "next/link";
import {Row} from "@/app/_components/row";

export default function UsersPage() {
    return (
        <Flex direction="column" className="p-8 gap-8">
            <Row className="justify-between items-center">
                <Text size="6">Users</Text>
                <Link href="/users/create">
                    <Button size="4">
                        + New user
                    </Button>
                </Link>
            </Row>
            <UsersTable/>
        </Flex>
    );
}