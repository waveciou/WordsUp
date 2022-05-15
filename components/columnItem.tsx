import React from 'react';

interface IColumnItemProps {
  children: React.ReactNode,
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
      className={`tw-w-full tw-mb-3 tablet:tw-w-[calc((100%-0.75rem)/2)] tablet:tw-mr-3 desktop:tw-w-[calc((100%-1.5rem)/3)] ${isLastChild ? 'tw-mb-0 desktop:tw-mb-3' : ''} ${isEvenChild ? 'tablet:tw-mr-0 desktop:tw-mr-3' : ''} ${!isEvenChild && (index > length - 3) ? 'tablet:tw-mb-0 desktop:tw-mb-3' : ''} ${isThirChild ? 'desktop:tw-mr-0' : ''}`}
    >
      { children }
    </li>
  );
};

export default columnItem;
