import { ChangeEvent } from 'react';

interface ISelectOption {
  value: string;
  name: string;
}

interface ISelect {
  options: ISelectOption[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface IInputText {
  defaultValue: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface IPrimaryButton {
  text: string;
  isDisabled?: boolean;
  colorStyle?: 'green' | 'red' | 'green-dark';
  onClick: () => void;
}

interface ICheckbox {
  id: string;
  title: string;
  status: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type { ISelectOption, ISelect, IInputText, IPrimaryButton, ICheckbox };
