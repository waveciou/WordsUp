const handleSetWordStatusList = (statusList: string[]) => {
  const result: string[] = statusList.reduce((prevList: string[], statusText: string) => {
    const splitArray: string[] = statusText.split('、');
    const resultArray: string[] = splitArray.filter((itemText: string) => itemText !== '');
    return [...prevList, ...resultArray];
  }, []);
  return result;
};

export default handleSetWordStatusList;
