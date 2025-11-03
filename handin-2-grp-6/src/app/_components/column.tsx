import React, {type FC, type HTMLProps} from 'react';

export const Column: FC<HTMLProps<HTMLDivElement>> = (props) => {
    const {children, className} = props;

    return (
        <div {...props} className={'flex flex-col ' + className}>
            {children}
        </div>
    );
};
