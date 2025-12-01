import React, { type FC, type HTMLProps } from 'react';

export const PageComponent: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { children, className } = props;

  return (
    <div {...props} className={'flex h-full w-full flex-col ' + className}>
      {children}
    </div>
  );
};
