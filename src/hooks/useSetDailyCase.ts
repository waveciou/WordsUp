/**
 * Verify data from IndexedDB to return correct daily case.
 */

import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import randomCollection from '@/Functions/randomCollection';
import { IDailyCase } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

const useSetDailyCase = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  return useCallback(
    (dateId: string, localData: IDailyCase | undefined): IDailyCase => {
      const result: IDailyCase = { date: dateId, words: [] };
      let hasLocalData: boolean = false;

      if (localData) {
        const { date = '', words = [] }: IDailyCase = JSON.parse(
          JSON.stringify(localData)
        );
        const wordsNumberToSet: Set<string> = new Set(words);

        if (date === dateId && wordsNumberToSet.size === 10) {
          const cleanedWords: string[] = [...wordsNumberToSet];

          const isConfirm: boolean = cleanedWords.every(
            (wordId: string) =>
              WORDS_DATA.findIndex(({ id }) => id === wordId) >= 0
          );

          if (isConfirm) {
            hasLocalData = true;
            result.words = [...cleanedWords];
          }
        }
      }

      if (hasLocalData === false) {
        const randoms: number[] = randomCollection(10, WORDS_DATA.length);
        result.words = randoms.map((num: number) => WORDS_DATA[num].id);
      }

      return result;
    },
    [WORDS_DATA]
  );
};

export default useSetDailyCase;
