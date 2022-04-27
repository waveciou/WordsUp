/* eslint-disable max-len */
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import randomCollection from '@/Functions/randomCollection';
import { IExamId } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

const writedGroupMapping = {
  'writed-group-1': ['a', 'b', 'c', 'd', 'e'],
  'writed-group-2': ['f', 'g', 'h', 'i', 'j'],
  'writed-group-3': ['k', 'l', 'm', 'n', 'o'],
  'writed-group-4': ['p', 'q', 'r', 's', 't'],
  'writed-group-5': ['u', 'v', 'w', 'x', 'y', 'z'],
};

const useQuestions = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILY_WORDS = useSelector((state: RootState) => state.daily.dailyWords);

  return useCallback((id: IExamId, quantity: number): IWordItem[] => {
    switch (id) {
      case 'writed-daily': {
        // 今日單字填空測驗
        return [...DAILY_WORDS].sort(() => (Math.random() > 0.5 ? -1 : 1));
      }
      case 'writed-random': {
        // 單字填空測驗
        const randoms: number[] = randomCollection(quantity, WORDS_DATA.length);
        return randoms.map((num: number) => WORDS_DATA[num]);
      }
      case 'writed-group-1':
      case 'writed-group-2':
      case 'writed-group-3':
      case 'writed-group-4':
      case 'writed-group-5': {
        // 字首單字填空測驗
        const FOCUS_WORDS: IWordItem[] = WORDS_DATA.filter(({ alphabet }) => writedGroupMapping[id].includes(alphabet));
        const randoms: number[] = randomCollection(quantity, FOCUS_WORDS.length);
        return randoms.map((num: number) => FOCUS_WORDS[num]);
      }
      default: {
        return [];
      }
    }
  }, [WORDS_DATA, DAILY_WORDS]);
};

export default useQuestions;
