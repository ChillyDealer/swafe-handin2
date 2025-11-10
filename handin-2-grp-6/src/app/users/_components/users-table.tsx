import {ScrollArea, Table} from "@radix-ui/themes"

export const UsersTable = () => {
    const users = fetch
    
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
                
            </Table.Body>
        </Table.Root>
    </ScrollArea>
}