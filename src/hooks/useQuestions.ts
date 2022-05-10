import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import randomCollection from '@/Functions/randomCollection';
import { IExamId } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

const useQuestions = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILYS_DATA = useSelector((state: RootState) => state.daily.dailyWords);
  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);

  return useCallback((id: IExamId, quantity: number): IWordItem[] => {
    switch (id) {
      case 'writed-daily': {
        // * 今日單字填空測驗
        return [...DAILYS_DATA].sort(() => (Math.random() > 0.5 ? -1 : 1));
      }
      case 'writed-random': {
        // * 隨機單字填空測驗
        const randoms: number[] = randomCollection(quantity, WORDS_DATA.length);
        return randoms.map((num: number) => WORDS_DATA[num]);
      }
      case 'writed-favorite': {
        // * 收藏單字填空測驗
        return [...FAVORITES_DATA].sort(() => (Math.random() > 0.5 ? -1 : 1));
      }
      default: {
        return [];
      }
    }
  }, [WORDS_DATA, DAILYS_DATA, FAVORITES_DATA]);
};

export default useQuestions;
