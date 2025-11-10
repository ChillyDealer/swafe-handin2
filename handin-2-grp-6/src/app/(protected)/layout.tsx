import React from "react";
import {AuthService} from "@/app/services/auth.service";
import {Column} from "@/app/_components/column";
import {Navbar} from "@/app/_components/navbar";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedLayout(props: Props) {
    const {children} = props;

    AuthService.requireAuth();

    return (
        <Column>
            <Navbar/>
            {children}
        </Column>);
}