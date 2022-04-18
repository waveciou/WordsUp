import { IWordItem } from '@/Interfaces/word';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isExamTesting: boolean
} = {
  isExamTesting: false,
};

export const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setIsExamTesting: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.isExamTesting = action.payload;
    },
  },
});

export const { setIsExamTesting } = examSlice.actions;

export default examSlice.reducer;
