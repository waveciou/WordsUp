import { IWordItem } from '@/Interfaces/word';

export interface ISheetData {
  values: { formattedValue: string }[]
}

export interface IGapiResponse {
  words: IWordItem[],
  parts: string[],
  favorites: IWordItem[],
}
