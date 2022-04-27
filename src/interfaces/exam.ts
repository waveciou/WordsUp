export type IWritedExamId = 'writed-random' | 'writed-daily' | 'writed-group-1' | 'writed-group-2' | 'writed-group-3' | 'writed-group-4' | 'writed-group-5';

export type IExamId = '' | IWritedExamId;

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
