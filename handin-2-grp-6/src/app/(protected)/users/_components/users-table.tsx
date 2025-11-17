'use client';

import {ScrollArea, Table} from "@radix-ui/themes"
import {getUsers} from "@/app/_data/users";
import {useEffect, useState} from "react";
import {User} from "@/app/_types/user";

export const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading users...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600">Error: {error}</div>;
    }
    
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
                {users.map(user => (
                    <Table.Row key={user.userId}>
                        <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.personalTrainerId || 'N/A'}</Table.Cell>
                        <Table.Cell>{user.accountType}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </ScrollArea>
}