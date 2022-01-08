const handleGetRandomNumber = (min: number, max: number) => {
  const amount: number = max - min;
  const result: number = Math.floor(Math.random() * amount + min);
  return result;
};

export default handleGetRandomNumber;
