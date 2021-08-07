import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { value: number } = {
  value: 0
};

export const screenWidthSlice = createSlice({
  name: 'screenWidth',
  initialState,
  reducers: {
    setScreenWidth: (state, action: PayloadAction<number>) => {
      const value: number = action.payload < 1 ? 0 : action.payload;
      state.value = value;
    }
  }
});

export const { setScreenWidth } = screenWidthSlice.actions;

export default screenWidthSlice.reducer;