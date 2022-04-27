/* eslint-disable max-len */
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import randomCollection from '@/Functions/randomCollection';
import { IExamId } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

const useQuestions = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILY_WORDS = useSelector((state: RootState) => state.daily.dailyWords);

  return useCallback((id: IExamId, quantity: number): IWordItem[] => {
    switch (id) {
      case 'daily-writed-exam': {
        // 今日單字填空測驗
        return [...DAILY_WORDS].sort(() => (Math.random() > 0.5 ? -1 : 1));
      }
      case 'writed-exam': {
        // 單字填空測驗
        const randomNumbers: number[] = randomCollection(quantity, WORDS_DATA.length);
        return randomNumbers.map((num: number) => WORDS_DATA[num]);
      }
      default: {
        return [];
      }
    }
  }, [WORDS_DATA, DAILY_WORDS]);
};

export default useQuestions;
