import { IGapiResponse } from '@/Interfaces/sheetData';
import { IWordItem } from '@/Interfaces/word';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IGapiResponse = { words: [], parts: [], favorites: [] };

const updateFavoriteLocalData = (payload: IWordItem[]) => {
  const localData: string[] = payload.map(({ id }) => id);
  localStorage.setItem('favorite', JSON.stringify([...localData]));
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setWordItems: (state, action: PayloadAction<IWordItem[]>) => {
      const asignState = state;
      asignState.words = [...action.payload];
    },
    setPartItems: (state, action: PayloadAction<string[]>) => {
      const asignState = state;
      asignState.parts = [...action.payload];
    },
    setFavoriteItems: (state, action: PayloadAction<IWordItem[]>) => {
      const asignState = state;
      asignState.favorites = [...action.payload];
      updateFavoriteLocalData(asignState.favorites);
    },
    addFavoriteItem: (state, action: PayloadAction<string>) => {
      const asignState = state;
      const word: IWordItem | undefined = asignState.words.find(({
        id,
      }: IWordItem) => id === action.payload);

      if (word) {
        asignState.favorites.push(word);
        updateFavoriteLocalData(asignState.favorites);
      }
    },
    deleteFavoriteItem: (state, action: PayloadAction<string>) => {
      const asignState = state;
      const index: number = asignState.favorites.findIndex(({
        id,
      }: IWordItem) => id === action.payload);

      if (index > -1) {
        asignState.favorites.splice(index, 1);
        updateFavoriteLocalData(asignState.favorites);
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
