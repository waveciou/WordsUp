import * as React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';

// Style
import styles from '../../styles/common/Form.module.scss';

// Interface
import { ISelect } from '../../src/interfaces/I_Form';

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

export const inputText: React.FC = () => (
  <input type="text" />
);
