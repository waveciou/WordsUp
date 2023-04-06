import React from 'react';

interface IColumnItemProps {
  children: React.ReactNode;
  id: string;
  index: number;
  length: number;
}

const columnItem = ({ children, id }: IColumnItemProps) => (
  <li key={id} className="w-full mb-3 column-item">
    {children}
  </li>
);

export default columnItem;
