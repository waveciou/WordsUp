export interface IWordItem {
  id: string,
  en: string,
  zh: string[],
  parts: string[]
  alphabet: string
}

export interface IDailyCase {
  date: string;
  words: string[];
}
