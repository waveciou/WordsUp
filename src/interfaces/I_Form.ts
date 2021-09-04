import { ChangeEvent } from 'react';

export interface ISelect {
  options: {value: string | number, name: string}[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
