export interface IExampleItem {
  sentence: string,
  key: string,
}

export interface IExampleListItem {
  englishItem: IExampleItem,
  chineseItem: IExampleItem
}

export interface IWordCase {
  english: string,
  chinese: string,
  parts: string[],
  englishExample: IExampleItem[],
  chineseExample: IExampleItem[],
  status: string[]
}

export interface IWordItem {
  word: IWordCase;
}
