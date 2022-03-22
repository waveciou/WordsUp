/* eslint-disable import/order */
import { IWordCase } from '@/Interfaces/I_WordCase';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { value: IWordCase[] } = {
  value: [],
};

export const wordsCollectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setWordsCollection: (state, action: PayloadAction<IWordCase[]>) => {
      const _state = state;
      _state.value = [...action.payload];
    },
  },
});

export const { setWordsCollection } = wordsCollectionSlice.actions;

export default wordsCollectionSlice.reducer;
