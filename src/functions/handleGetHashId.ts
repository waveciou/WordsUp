const handleGetHashId = (index: number) => {
  const date = new Date();
  const timeValue = date.getTime();
  return `${timeValue}_${index}`;
};

export default handleGetHashId;
