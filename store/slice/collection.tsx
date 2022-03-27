/* eslint-disable import/order */
import { IWordItem } from '@/Interfaces/word';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  words: IWordItem[]
} = {
  words: [],
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setWordItems: (state, action: PayloadAction<IWordItem[]>) => {
      const asignState = state;
      asignState.words = [...action.payload];
    },
  },
});

export const { setWordItems } = collectionSlice.actions;

export default collectionSlice.reducer;
