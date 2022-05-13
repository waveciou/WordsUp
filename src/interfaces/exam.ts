import { IWordItem } from '@/Interfaces/word';

export type IWritedExamId = 'writed-random' | 'writed-daily' | 'writed-favorite';
export type ISelectedExamId = 'selected-random' | 'selected-daily' | 'selected-favorite';
export type IExamId = '' | IWritedExamId | ISelectedExamId;

export interface IAnswerItem {
  id: string,
  answer: string,
  solution: string,
  result: boolean,
}

export interface IRecordItem {
  id: IExamId;
  startTime: number;
  finishTime: number;
  answerState: IAnswerItem[]
}

export interface IRecordLocalItem {
  id: IExamId;
  startTime: number;
  finishTime: number;
  answerState: {
    id: string,
    answer: string
  }[]
}

export interface ISelectedWordItem extends IWordItem {
  options: string[];
}
