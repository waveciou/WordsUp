// export interface IExampleItem {
//   sentence: string,
//   key: string,
// }

// export interface IExampleListItem {
//   englishItem: IExampleItem,
//   chineseItem: IExampleItem
// }

// export interface IWordCase {
//   english: string,
//   chinese: string,
//   parts: string[],
//   englishExample: IExampleItem[],
//   chineseExample: IExampleItem[],
//   status: string[]
// }

// export interface IWordItem {
//   word: IWordCase;
// }

// export interface IWordParts {
//   id: string,
//   name: string
// }

export interface IWordItem {
  en: string,
  zh: string[],
  parts: string[]
}
