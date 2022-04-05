import React, { ChangeEvent, useEffect, useState } from 'react';

import { ICheckbox, ISelect } from '@/Interfaces/form';
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
        {
          options.map((option) => {
            const { value, name } = option;
            return <option key={value} value={value}>{name}</option>;
          })
        }
      </select>
    </div>
  );
};

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

export const inputText: React.FC = () => (
  <input type="text" />
);
