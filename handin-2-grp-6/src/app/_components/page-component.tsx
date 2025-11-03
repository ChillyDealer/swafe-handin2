import React, {type FC, type HTMLProps} from 'react';
import {Row} from "@/app/_components/row";

export const PageComponent: FC<HTMLProps<HTMLDivElement>> = (props) => {
    const {children, className} = props;

    return (
        <Row {...props} className={"h-full w-full" + className}>
            {children}
        </Row>
    );
};