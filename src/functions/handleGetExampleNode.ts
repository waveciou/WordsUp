const handleGetExampleNode = (example: { sentence: string, key: string }) => {
  const { sentence, key } = example;
  const result: string = sentence.replaceAll(key, `<strong>${key}</strong>`);
  return `<div class="sentence">${result}</div>`;
};

export default handleGetExampleNode;
