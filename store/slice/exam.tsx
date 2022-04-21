import { IRecordItem } from '@/Interfaces/exam';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isExamAction: boolean,
  isExamTesting: boolean,
  recordCollection: IRecordItem[]
} = {
  isExamAction: false,
  isExamTesting: false,
  recordCollection: [],
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
    setRecordCollection: (state, action: PayloadAction<IRecordItem>) => {
      const asignState = state;
      asignState.recordCollection.push(action.payload);
    },
  },
});

export const { setIsExamAction, setIsExamTesting, setRecordCollection } = examSlice.actions;

export default examSlice.reducer;
