import { IGapiResponse } from '@/Interfaces/sheetData';
import { IWordItem } from '@/Interfaces/word';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IGapiResponse = { words: [], parts: [] };

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
  },
});

export const { setWordItems, setPartItems } = collectionSlice.actions;

export default collectionSlice.reducer;
