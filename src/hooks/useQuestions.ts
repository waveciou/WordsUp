import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import randomCollection from '@/Functions/randomCollection';
import { IExamId } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

const useQuestions = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILYS_DATA = useSelector((state: RootState) => state.daily.dailyWords);
  const FAVORITES_DATA = useSelector(
    (state: RootState) => state.collection.favorites
  );

  return useCallback(
    (id: IExamId, quantity: number): IWordItem[] => {
      switch (id) {
        // * 隨機單字填空測驗
        // * 隨機單字選擇測驗
        case 'writed-random':
        case 'selected-random': {
          const randoms: number[] = randomCollection(
            quantity,
            WORDS_DATA.length
          );
          return randoms.map((num: number) => WORDS_DATA[num]);
        }
        // * 今日單字填空測驗
        // * 今日單字選擇測驗
        case 'writed-daily':
        case 'selected-daily': {
          return [...DAILYS_DATA].sort(() => (Math.random() > 0.5 ? -1 : 1));
        }
        // * 收藏單字填空測驗
        // * 收藏單字選擇測驗
        case 'writed-favorite':
        case 'selected-favorite': {
          return [...FAVORITES_DATA].sort(() => (Math.random() > 0.5 ? -1 : 1));
        }
        default: {
          return [];
        }
      }
    },
    [WORDS_DATA, DAILYS_DATA, FAVORITES_DATA]
  );
};

export default useQuestions;
