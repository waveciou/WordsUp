import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { IInputText, IPrimaryButton, ISelect } from '@/Interfaces/form';

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
    <div className="element-select">
      <select value={currentValue} onChange={handleOnChange}>
        {options.map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
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
    className="w-full h-10 block py-3 px-4 leading-4 rounded-md text-xs bg-gray-light"
    value={defaultValue}
    onChange={onChange}
    placeholder={placeholder}
  />
);

// * Primary Button

export const PrimaryButton: React.FC<IPrimaryButton> = ({
  text = '',
  colorStyle = 'green',
  isDisabled = false,
  onClick = () => {},
}: IPrimaryButton) => {
  const ClassColorStyle = useMemo(() => {
    switch (colorStyle) {
      case 'red':
        return 'bg-red desktop:hover:bg-wine';
      case 'green-dark':
        return 'bg-green-dark desktop:hover:bg-green';
      default:
        return 'bg-green desktop:hover:bg-green-dark';
    }
  }, [colorStyle]);

  return (
    <button
      type="button"
      className={`min-w-105 py-2 px-5 mx-1.5 inline-block text-sm text-center text-white rounded-lg leading-6 ${
        isDisabled ? 'bg-gray-dark cursor-not-allowed' : ClassColorStyle
      }`}
      onClick={onClick}
      title={text}
    >
      {text}
    </button>
  );
};
