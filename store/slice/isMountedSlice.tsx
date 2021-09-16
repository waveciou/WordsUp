import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { value: boolean } = {
  value: false,
};

export const isMountedSlice = createSlice({
  name: 'isMounted',
  initialState,
  reducers: {
    setIsMounted: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      _state.value = action.payload;
    },
  },
});

export const { setIsMounted } = isMountedSlice.actions;

export default isMountedSlice.reducer;
