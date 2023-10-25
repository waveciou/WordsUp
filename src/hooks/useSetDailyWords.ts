/* eslint-disable no-console */

/**
 * Use the ID of daily words to add words data.
 */

import { createStore, set } from 'idb-keyval';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IDailyCase, IWordItem } from '@/Interfaces/word';
import { setDailyWords } from '@/Slice/daily';
import { RootState } from '@/Store/index';

const useSetDailyWords = () => {
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  return useCallback(
    (dailyCase: IDailyCase) => {
      const wordsUpStore = createStore('wordsUpDB', 'wordsUpStore');

      const result: IWordItem[] = dailyCase.words.reduce((prev, current) => {
        const word: IWordItem | undefined = WORDS_DATA.find(
          ({ id }) => id === current
        );
        if (word) {
          return [...prev, word];
        }
        return [...prev];
      }, [] as IWordItem[]);

      dispatch(setDailyWords(result));

      set('daily', dailyCase, wordsUpStore)
        .then(() => console.log('set daily successfully'))
        .catch((error) => console.log('set daily failed', error));
    },
    [WORDS_DATA, dispatch]
  );
};

export default useSetDailyWords;
