import React, { ChangeEvent, useEffect, useState } from 'react';

import { IInputText, IPrimaryButton, ISelect } from '@/Interfaces/form';
import styles from '@/Styles/form.module.scss';

// * Select

export const Select: React.FC<ISelect> = ({ options, onChange }: ISelect) => {
  const [currentValue, setCurrentValue] = useState<string | number>('');

  useEffect(() => {
    const result: string | number = options.length > 0 ? options[0].value : '';
    setCurrentValue(result);
  }, [options]);

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentValue(event.target.value);
    onChange(event);
  };

  return (
    <div className={styles.select}>
      <select value={currentValue} onChange={handleOnChange}>
        { options.map(({ value, name }) => <option key={value} value={value}>{name}</option>) }
      </select>
    </div>
  );
};

// * Input Text

export const InputText: React.FC<IInputText> = ({
  defaultValue = '',
  placeholder = '',
  onChange,
}: IInputText) => (
  <input
    type="text"
    className="tw-w-full tw-h-10 tw-block tw-py-3 tw-px-4 tw-leading-4 tw-rounded-md tw-text-xs tw-bg-gray-light"
    value={defaultValue}
    onChange={onChange}
    placeholder={placeholder}
  />
);

// * Primary Button

export const PrimaryButton: React.FC<IPrimaryButton> = ({
  text = '',
  isDisabled = false,
  onClick = () => {},
}: IPrimaryButton) => (
  <button
    type="button"
    className={`tw-min-w-105 tw-py-2 tw-px-5 tw-mx-1.5 tw-inline-block tw-text-sm tw-text-center tw-text-white tw-rounded-lg tw-leading-6 ${isDisabled ? 'tw-bg-black tw-opacity-60 tw-cursor-not-allowed' : 'tw-bg-green desktop:hover:tw-bg-green-dark'}`}
    onClick={onClick}
    title={text}
  >
    {text}
  </button>
);

// * Checkbox
// export const Checkbox: React.FC<ICheckbox> = ({
//   id, title, status, onChange, disabled = false,
// }: ICheckbox) => {
//   const ClassHandle = (name: string) => styles[`checkbox__${name}`];

//   const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (disabled === false) {
//       onChange(event);
//     }
//   };

//   return (
//     <label
//       htmlFor={id}
//       className={`
//         ${styles.checkbox}
//         ${disabled === true ? styles['is-disabled'] : ''}
//       `}
//     >
//       <input
//         id={id}
//         type="checkbox"
//         checked={status}
//         onChange={handleOnChange}
//       />
//       <div className={ClassHandle('content')}>
//         <span className={ClassHandle('title')}>{title}</span>
//       </div>
//     </label>
//   );
// };
