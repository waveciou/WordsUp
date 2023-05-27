/* eslint-disable no-shadow */
import { IWordItem } from '@/Interfaces/word';

enum EnumWritedExamID {
  RANDOM = 'writed-random',
  DAILY = 'writed-daily',
  FAVORITE = 'writed-favorite',
}

enum EnumSelectedExamID {
  RANDOM = 'selected-random',
  DAILY = 'selected-daily',
  FAVORITE = 'selected-favorite',
}

type IExamID =
  | ''
  | EnumWritedExamID.RANDOM
  | EnumWritedExamID.DAILY
  | EnumWritedExamID.FAVORITE
  | EnumSelectedExamID.RANDOM
  | EnumSelectedExamID.DAILY
  | EnumSelectedExamID.FAVORITE;

interface IAnswerItem {
  id: string;
  answer: string;
  solution: string;
  result: boolean;
}

interface IRecordItem {
  id: IExamID;
  startTime: number;
  finishTime: number;
  answerState: IAnswerItem[];
}

interface IRecordLocalItem {
  id: IExamID;
  startTime: number;
  finishTime: number;
  answerState: {
    id: string;
    answer: string;
  }[];
}

interface ISelectedWordItem extends IWordItem {
  options: string[];
}

export { EnumWritedExamID, EnumSelectedExamID };

export type {
  IExamID,
  IAnswerItem,
  IRecordItem,
  IRecordLocalItem,
  ISelectedWordItem,
};
