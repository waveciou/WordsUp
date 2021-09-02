const handleSetWordStatusNode = (statusText: string) => {
  const textArray: string[] = statusText.split('、');
  const result: string = textArray.reduce((prevItem: string, currentItem: string) => `${prevItem}<li>${currentItem}</li>`, '');
  return `<ul class="wordStatus">${result}</ul>`;
};

export default handleSetWordStatusNode;
