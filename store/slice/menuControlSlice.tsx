import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { value: boolean } = {
  value: false,
};

export const menuControlSlice = createSlice({
  name: 'menuControl',
  initialState,
  reducers: {
    setMenuControl: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      _state.value = action.payload;
    },
  },
});

export const { setMenuControl } = menuControlSlice.actions;

export default menuControlSlice.reducer;
