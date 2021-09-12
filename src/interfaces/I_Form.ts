import { ChangeEvent } from 'react';

export interface ISelectOption {
  value: string | number;
  name: string;
}

export interface ISelect {
  options: ISelectOption[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface ICheckbox {
  id: string;
  title: string;
  status: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
