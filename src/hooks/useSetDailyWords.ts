/**
 * Use the ID of daily words to add words data.
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IDailyCase, IWordItem } from '@/Interfaces/word';
import { setDailyWords } from '@/Slice/daily';
import { RootState } from '@/Store/index';

const useSetDailyWords = () => {
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  return useCallback((dailyCase: IDailyCase) => {
    const result: IWordItem[] = dailyCase.words.reduce((prev, current) => {
      const word: IWordItem | undefined = WORDS_DATA.find(({ id }) => id === current);
      if (word) {
        return [...prev, word];
      }
      return [...prev];
    }, [] as IWordItem[]);

    dispatch(setDailyWords(result));
    localStorage.setItem('daily', JSON.stringify(dailyCase));
  }, [WORDS_DATA, dispatch]);
};

export default useSetDailyWords;
