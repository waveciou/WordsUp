import React from 'react';

interface IColumnItemProps {
  children: React.ReactNode,
  id: string;
  index: number;
  length: number;
}

const columnItem = ({ children, id, index, length }: IColumnItemProps) => {
  const isEven: boolean = !!(index % 2 === 1);
  const isThirChid: boolean = !!((index + 1) % 3 === 0);
  return (
    <li
      key={id}
      className={`tw-w-full tablet:tw-w-[calc((100%-0.75rem)/2)] tablet:tw-mr-3 desktop:tw-w-[calc((100%-1.5rem)/3)] ${index + 1 < length ? 'tw-mb-3' : ''} ${isEven ? 'tablet:tw-mr-0 desktop:tw-mr-3' : ''} ${isThirChid ? 'desktop:tw-mr-0' : ''}`}
    >
      { children }
    </li>
  );
};

export default columnItem;
