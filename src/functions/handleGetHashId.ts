const handleGetHashId = (index: number, keycode: string) => {
  const date = new Date();
  const timeValue = date.getTime();
  const key = keycode.replace(/ /g, '');
  return `${timeValue}_${index}_${key}`;
};

export default handleGetHashId;
