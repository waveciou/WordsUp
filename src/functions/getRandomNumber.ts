const handleGetRandomNumber = (min: number, max: number) => {
  const amount: number = max - min;
  return Math.floor(Math.random() * amount + min);
};

export default handleGetRandomNumber;
