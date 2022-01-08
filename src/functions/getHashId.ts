const handleGetHashId = (index: number, keycode: string) => {
  const date: Date = new Date();
  const timeValue: number = date.getTime();
  const key: string = keycode.replace(/ /g, '');
  const result: string = `${timeValue}_${index}_${key}`;
  return result;
};

export default handleGetHashId;
