import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface
import { IWordCase } from '../../src/interfaces/I_WordCase';

const initialState: { value: IWordCase[] } = {
  value: [],
};

export const wordsCollectionSlice = createSlice({
  name: 'wordsCollection',
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
