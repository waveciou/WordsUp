import { IAnswerItem } from '@/Interfaces/exam';

const getExamScore = (answerState: IAnswerItem[]): number => {
  const state: IAnswerItem[] = [...answerState];
  const correctItems: IAnswerItem[] = state.filter(
    ({ result }) => result === true
  );
  const correctNumber: number = correctItems.length / state.length;
  const amount: number = Number.isNaN(correctNumber) ? 0 : correctNumber;
  return Math.floor(amount * 100);
};

export default getExamScore;
