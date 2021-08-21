import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { value: boolean } = {
  value: false,
};

export const loaderControlSlice = createSlice({
  name: 'loaderControl',
  initialState,
  reducers: {
    setLoaderControl: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      _state.value = action.payload;
    },
  },
});

export const { setLoaderControl } = loaderControlSlice.actions;

export default loaderControlSlice.reducer;
