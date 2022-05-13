import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import randomCollection from '@/Functions/randomCollection';
import randomNumber from '@/Functions/randomNumber';
import { IExamId, ISelectedExamItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

const useQuestions = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILYS_DATA = useSelector((state: RootState) => state.daily.dailyWords);
  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);

  return useCallback((id: IExamId, quantity: number): IWordItem[] | ISelectedExamItem[] => {
    switch (id) {
      // * 隨機單字填空測驗
      case 'writed-random': {
        const randoms: number[] = randomCollection(quantity, WORDS_DATA.length);
        return randoms.map((num: number) => WORDS_DATA[num]);
      }
      // * 今日單字填空測驗
      case 'writed-daily': {
        return [...DAILYS_DATA].sort(() => (Math.random() > 0.5 ? -1 : 1));
      }
      // * 收藏單字填空測驗
      case 'writed-favorite': {
        return [...FAVORITES_DATA].sort(() => (Math.random() > 0.5 ? -1 : 1));
      }
      // * 隨機單字選擇測驗
      case 'selected-random': {
        const randoms: number[] = randomCollection(quantity, WORDS_DATA.length);
        return randoms.map((num: number) => {
          const wordItem: IWordItem = WORDS_DATA[num];
          const options: string[] = [wordItem.en];

          while (options.length <= 4) {
            const { en } = WORDS_DATA[randomNumber(0, WORDS_DATA.length - 1)];
            const optionsSet: Set<string> = new Set(...options);

            if (!optionsSet.has(en)) {
              options.push(en);
            }
          }

          return {
            ...wordItem,
            options: options.sort(() => (Math.random() > 0.5 ? -1 : 1)),
          };
        });
      }
      default: {
        return [];
      }
    }
  }, [WORDS_DATA, DAILYS_DATA, FAVORITES_DATA]);
};

export default useQuestions;
