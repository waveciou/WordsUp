import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isMounted: boolean,
  isLoading: boolean,
  isMenuOpen: boolean,
  screenWidth: number,
  scrollValue: number
} = {
  isMounted: false,
  isLoading: true,
  isMenuOpen: false,
  screenWidth: 0,
  scrollValue: 0,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsMounted: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.isMounted = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.isLoading = action.payload;
    },
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.isMenuOpen = action.payload;
    },
    setScreenWidth: (state, action: PayloadAction<number>) => {
      const asignState = state;
      asignState.screenWidth = action.payload < 1 ? 0 : action.payload;
    },
    setScrollValue: (state, action: PayloadAction<number>) => {
      const asignState = state;
      asignState.scrollValue = action.payload < 1 ? 0 : action.payload;
    },
  },
});

export const {
  setIsMounted,
  setIsLoading,
  setIsMenuOpen,
  setScreenWidth,
  setScrollValue,
} = commonSlice.actions;

export default commonSlice.reducer;
