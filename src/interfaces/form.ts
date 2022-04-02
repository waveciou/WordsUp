import { ChangeEvent } from 'react';

export interface ISelectOption {
  value: string;
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
  disabled?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}