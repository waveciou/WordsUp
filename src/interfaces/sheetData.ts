import { IWordItem } from '@/Interfaces/word';

interface ISheetData {
  values: { formattedValue: string }[];
}

interface IGapiResponse {
  words: IWordItem[];
  parts: string[];
  favorites: IWordItem[];
}

export type { ISheetData, IGapiResponse };
