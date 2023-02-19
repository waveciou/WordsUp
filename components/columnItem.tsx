import React from 'react';

interface IColumnItemProps {
  children: React.ReactNode;
  id: string;
  index: number;
  length: number;
}

const columnItem = ({ children, id, index, length }: IColumnItemProps) => {
  const isEvenChild: boolean = !!(index % 2 === 1);
  const isThirChild: boolean = !!((index + 1) % 3 === 0);
  const isLastChild: boolean = !!(index === length - 1);
  return (
    <li
      key={id}
      className={`w-full mb-3 tablet:w-[calc((100%-0.75rem)/2)] tablet:mr-3 desktop:w-[calc((100%-1.5rem)/3)] ${
        isLastChild ? 'mb-0 desktop:mb-3' : ''
      } ${isEvenChild ? 'tablet:mr-0 desktop:mr-3' : ''} ${
        !isEvenChild && index > length - 3 ? 'tablet:mb-0 desktop:mb-3' : ''
      } ${isThirChild ? 'desktop:mr-0' : ''}`}
    >
      {children}
    </li>
  );
};

export default columnItem;
