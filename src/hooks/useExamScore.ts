import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { IAnswerItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

const useExamScore = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  return useCallback((answerState: IAnswerItem[]): number => {
    const state: IAnswerItem[] = [...answerState];
    const correctItems: IAnswerItem[] = state.filter(({ id, answer }) => {
      if (WORDS_DATA.length) {
        const word: IWordItem | undefined = WORDS_DATA.find((item) => item.id === id);
        if (word) {
          return answer === word.en;
        }
      }
      return false;
    });
    const correctNumber: number = correctItems.length / state.length;
    const amount: number = Number.isNaN(correctNumber) ? 0 : correctNumber;
    return Math.floor(amount * 100);
  }, [WORDS_DATA]);
};

export default useExamScore;
