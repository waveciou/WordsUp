import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IDailyCases, IWordItem } from '@/Interfaces/word';
import { setDailyWords } from '@/Slice/daily';
import { RootState } from '@/Store/index';

const useSetDailyWords = () => {
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  return useCallback((dailyCases: IDailyCases) => {
    const result: IWordItem[] = dailyCases.words.reduce((prev, current) => {
      const index: number = WORDS_DATA.findIndex(({ id }) => id === `${current}`);
      return [...prev, WORDS_DATA[index]];
    }, [] as IWordItem[]);

    dispatch(setDailyWords(result));
    localStorage.setItem('daily', JSON.stringify(dailyCases));
  }, [WORDS_DATA, dispatch]);
};

export default useSetDailyWords;