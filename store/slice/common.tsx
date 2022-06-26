import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isAppMounted: boolean;
  isLoading: boolean;
  isMenuOpen: boolean;
  screenWidth: number;
  scrollValue: number;
} = {
  isAppMounted: false,
  isLoading: true,
  isMenuOpen: false,
  screenWidth: 0,
  scrollValue: 0,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsAppMounted: (state, action: PayloadAction<boolean>) => {
      const assignState = state;
      assignState.isAppMounted = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      const assignState = state;
      assignState.isLoading = action.payload;
    },
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      const assignState = state;
      assignState.isMenuOpen = action.payload;
    },
    setScreenWidth: (state, action: PayloadAction<number>) => {
      const assignState = state;
      assignState.screenWidth = action.payload < 1 ? 0 : action.payload;
    },
    setScrollValue: (state, action: PayloadAction<number>) => {
      const assignState = state;
      assignState.scrollValue = action.payload < 1 ? 0 : action.payload;
    },
  },
});

export const {
  setIsAppMounted,
  setIsLoading,
  setIsMenuOpen,
  setScreenWidth,
  setScrollValue,
} = commonSlice.actions;

export default commonSlice.reducer;
