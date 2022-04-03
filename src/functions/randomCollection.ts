const randomCollection = (len: number, amount: number): number[] => {
  const result: number[] = [];
  const json: boolean[] = [];
  while (result.length < len) {
    const k: number = Math.round(Math.random() * amount);
    if (!json[k]) {
      json[k] = true;
      result.push(k);
    }
  }
  return result;
};

export default randomCollection;
