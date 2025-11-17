import {ScrollArea, Table} from "@radix-ui/themes"
import {getUsers} from "@/app/_data/users";

export const UsersTable = async () => {
    const users = await getUsers();
    
    return <ScrollArea scrollbars="vertical">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>
                        Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        E-mail
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        Personal trainer
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        Account type
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {users.map(u => <p>{u.userId}</p>)}
            </Table.Body>
        </Table.Root>
    </ScrollArea>
}