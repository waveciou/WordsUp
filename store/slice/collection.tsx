/* eslint-disable no-console */
import { createStore, set } from 'idb-keyval';

import { IGapiResponse } from '@/Interfaces/sheetData';
import { IWordItem } from '@/Interfaces/word';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IGapiResponse = { words: [], parts: [], favorites: [] };

const updateFavoriteLocalData = (payload: IWordItem[]) => {
  const localData: string[] = payload.map(({ id }) => id);
  const wordsUpStore = createStore('wordsUpDB', 'wordsUpStore');

  set('favorite', [...localData], wordsUpStore)
    .then(() => console.log('set favorite successfully'))
    .catch((error) => console.log('set favorite failed', error));
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setWordItems: (state, action: PayloadAction<IWordItem[]>) => {
      const assignState = state;
      assignState.words = [...action.payload];
    },
    setPartItems: (state, action: PayloadAction<string[]>) => {
      const assignState = state;
      assignState.parts = [...action.payload];
    },
    setFavoriteItems: (state, action: PayloadAction<IWordItem[]>) => {
      const assignState = state;
      assignState.favorites = [...action.payload];
      updateFavoriteLocalData(assignState.favorites);
    },
    addFavoriteItem: (state, action: PayloadAction<string>) => {
      const assignState = state;
      const word: IWordItem | undefined = assignState.words.find(
        ({ id }: IWordItem) => id === action.payload
      );

      if (word) {
        assignState.favorites.push(word);
        updateFavoriteLocalData(assignState.favorites);
      }
    },
    deleteFavoriteItem: (state, action: PayloadAction<string>) => {
      const assignState = state;
      const index: number = assignState.favorites.findIndex(
        ({ id }: IWordItem) => id === action.payload
      );

      if (index > -1) {
        assignState.favorites.splice(index, 1);
        updateFavoriteLocalData(assignState.favorites);
      }
    },
  },
});

export const {
  setWordItems,
  setPartItems,
  setFavoriteItems,
  addFavoriteItem,
  deleteFavoriteItem,
} = collectionSlice.actions;

export default collectionSlice.reducer;
