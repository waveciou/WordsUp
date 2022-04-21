export type IQuizTypes = '' | 'writed-exam' | 'daily-writed-exam';

export interface IAnswerItem {
  id: string,
  answer: string,
  solution: string,
  result: boolean,
}

export interface IRecordItem {
  type: IQuizTypes;
  startTime: number;
  finishTime: number;
  score: number;
  answerState: IAnswerItem[]
}
