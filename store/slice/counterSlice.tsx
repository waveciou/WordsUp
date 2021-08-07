import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { value: number } = {
  value: 0
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      const _state = state;
      _state.value += 1;
    },
    decrement: (state) => {
      const _state = state;
      _state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      const _state = state;
      _state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;