/**
 * Verify data from localStorage to return correct daily case.
 */

import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import randomCollection from '@/Functions/randomCollection';
import { IDailyCase } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

const useSetDailyCase = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  return useCallback((dateId:string, localData: string): IDailyCase => {
    const result: IDailyCase = { date: dateId, words: [] };
    let hasLocalData: boolean = false;

    if (localData) {
      const { date = '', words = [] }: IDailyCase = JSON.parse(localData);
      const wordsNumberToSet: Set<number> = new Set(words);

      if (date === dateId && wordsNumberToSet.size === 10) {
        const cleanedWords: number[] = [...wordsNumberToSet];

        const isConfirm: boolean = cleanedWords.every((item: number) => {
          const parsedItem: number = parseInt(item as unknown as string, 10);
          const isNotNaN: boolean = !Number.isNaN(parsedItem);
          const isValided: boolean = WORDS_DATA.findIndex(({ id }) => id === `${parsedItem}`) >= 0;
          return isNotNaN && isValided;
        });

        if (isConfirm) {
          hasLocalData = true;
          result.words = [...cleanedWords];
        }
      }
    }

    if (hasLocalData === false) {
      result.words = randomCollection(10, WORDS_DATA.length);
    }

    return result;
  }, [WORDS_DATA]);
};

export default useSetDailyCase;
