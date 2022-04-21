import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isExamAction: boolean,
  isExamTesting: boolean
} = {
  isExamAction: false,
  isExamTesting: false,
};

export const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setIsExamAction: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.isExamAction = action.payload;
    },
    setIsExamTesting: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.isExamTesting = action.payload;
    },
  },
});

export const { setIsExamAction, setIsExamTesting } = examSlice.actions;

export default examSlice.reducer;
