import { ChangeEvent } from 'react';

export interface ISelectOption {
  value: string | number;
  name: string;
}

export interface ISelect {
  options: ISelectOption[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
