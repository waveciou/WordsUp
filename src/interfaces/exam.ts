export type IWritedExamId = 'writed-random' | 'writed-daily';

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
