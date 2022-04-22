export type IExamId = '' | 'writed-exam' | 'daily-writed-exam';

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
