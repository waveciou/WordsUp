const handleGetPartsText = (parts: string[]) => {
  const result: string = parts.reduce((prevText, currentText, index) => {
    if (index === 0) {
      return `${currentText}`;
    }
    return `${prevText}、${currentText}`;
  }, '');
  return result;
};

export default handleGetPartsText;
