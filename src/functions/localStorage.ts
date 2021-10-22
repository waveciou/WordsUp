export const getItemWithPrimitive = (key: string) => {
  const result = localStorage.getItem(key);
  return result;
};

export const setItemWithPrimitive = (key: string, value: string | number | boolean) => {
  const result: string = `${value}`;
  localStorage.setItem(key, result);
};

export const getItemWithObject = (key: string) => {
  const value: string = localStorage.getItem(key) || '';
  if (value === '') {
    return '';
  }
  const result: {} | [] = JSON.parse(value);
  return result;
};

export const setItemWithObject = (key: string, value: any) => {
  const result: string = JSON.stringify(value);
  localStorage.setItem(key, result);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
