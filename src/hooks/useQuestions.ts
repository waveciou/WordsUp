import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import randomCollection from '@/Functions/randomCollection';
import {
  EnumSelectedExamID,
  EnumWritedExamID,
  IExamID,
} from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

const useQuestions = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILYS_DATA = useSelector((state: RootState) => state.daily.dailyWords);
  const FAVORITES_DATA = useSelector(
    (state: RootState) => state.collection.favorites
  );

  return useCallback(
    (id: IExamID, quantity: number): IWordItem[] => {
      switch (id) {
        // * 隨機單字填空測驗
        // * 隨機單字選擇測驗
        case EnumWritedExamID.RANDOM:
        case EnumSelectedExamID.RANDOM: {
          const randoms: number[] = randomCollection(
            quantity,
            WORDS_DATA.length
          );
          return randoms.map((num: number) => WORDS_DATA[num]);
        }
        // * 今日單字填空測驗
        // * 今日單字選擇測驗
        case EnumWritedExamID.DAILY:
        case EnumSelectedExamID.DAILY: {
          return [...DAILYS_DATA].sort(() => (Math.random() > 0.5 ? -1 : 1));
        }
        // * 收藏單字填空測驗
        // * 收藏單字選擇測驗
        case EnumWritedExamID.FAVORITE:
        case EnumSelectedExamID.FAVORITE: {
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
