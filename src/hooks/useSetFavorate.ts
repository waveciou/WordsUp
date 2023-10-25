/* eslint-disable no-console */
import { createStore, set } from 'idb-keyval';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IWordItem } from '@/Interfaces/word';
import { setFavoriteItems } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface IFavorateData {
  local: string[];
  global: IWordItem[];
}

const useSetFavorate = () => {
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  return useCallback(
    (localData: string[]) => {
      const wordsUpStore = createStore('wordsUpDB', 'wordsUpStore');

      const { local, global }: IFavorateData = localData.reduce(
        (prev, current) => {
          const word: IWordItem | undefined = WORDS_DATA.find(
            ({ id }) => id === current
          );
          if (word) {
            prev.local.push(current);
            prev.global.push(word);
          }
          return prev;
        },
        { local: [], global: [] } as IFavorateData
      );

      dispatch(setFavoriteItems(global));

      set('favorite', local, wordsUpStore)
        .then(() => console.log('set favorite successfully'))
        .catch((error) => console.log('set favorite failed', error));
    },
    [WORDS_DATA, dispatch]
  );
};

export default useSetFavorate;
