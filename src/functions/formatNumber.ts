const formatNumber = (amount: number) => {
  if (amount < 10) {
    return `0${amount}`;
  }
  return `${amount}`;
};

export default formatNumber;
