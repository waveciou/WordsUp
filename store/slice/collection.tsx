/* eslint-disable import/order */
import { IWordCase } from '@/Interfaces/I_WordCase';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  vocabulary: IWordCase[]
} = {
  vocabulary: [],
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setVocabulary: (state, action: PayloadAction<IWordCase[]>) => {
      const asignState = state;
      asignState.vocabulary = [...action.payload];
    },
  },
});

export const { setVocabulary } = collectionSlice.actions;

export default collectionSlice.reducer;
