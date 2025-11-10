import {Table, Text} from "@radix-ui/themes";
import {User} from "@/app/types/user";
import {FC} from "react";

interface Props {
    user: User;
}

export const UserRow: FC<Props> = (props) => {
    const {user} = props;

    return <Table.Row>
        <Table.RowHeaderCell>
            <Text>
                {user.firstName}
            </Text>
            <Text>
                {user.lastName}
            </Text>
        </Table.RowHeaderCell>
    </Table.Row>
}