import { IWordItem } from '@/Interfaces/word';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isExamTesting: boolean,
  questions: IWordItem[],
} = {
  isExamTesting: false,
  questions: [],
};

export const examSlice = createSlice({
  name: 'examination',
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
