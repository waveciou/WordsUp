import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { value: number } = {
  value: 0,
};

export const scrollValueSlice = createSlice({
  name: 'scrollValue',
  initialState,
  reducers: {
    setScrollValue: (state, action: PayloadAction<number>) => {
      const _state = state;
      const value: number = action.payload < 1 ? 0 : action.payload;
      _state.value = value;
    },
  },
});

export const { setScrollValue } = scrollValueSlice.actions;

export default scrollValueSlice.reducer;
