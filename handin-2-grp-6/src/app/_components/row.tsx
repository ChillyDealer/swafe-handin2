import React, {type FC, type HTMLProps} from 'react';

export const Row: FC<HTMLProps<HTMLDivElement>> = (props) => {
    const {children, className} = props;

    return (
        <div {...props} className={'flex flex-row ' + className}>
            {children}
        </div>
    );
};
