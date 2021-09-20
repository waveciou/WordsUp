export interface IWordCase {
  english: string,
  chinese: string,
  part: string,
  englishExample: {
    sentence: string,
    key: string,
  }[],
  chineseExample: {
    sentence: string,
    key: string,
  }[],
  status: string[]
}

export interface IWordItem {
  word: IWordCase;
}
