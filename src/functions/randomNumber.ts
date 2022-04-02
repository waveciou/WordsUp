const randomNumber = (min: number, max: number): number => {
  const amount: number = max - min;
  const result: number = Math.floor(Math.random() * amount + min);
  return result;
};

export default randomNumber;
