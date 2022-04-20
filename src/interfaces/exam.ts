export type IQuizTypes = '' | 'writed-exam' | 'daily-writed-exam';

export interface IAnswerItem {
  id: string,
  answer: string,
  solution: string,
  result: boolean,
}
