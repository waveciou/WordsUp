import { IRecordItem, IRecordLocalItem } from '@/Interfaces/exam';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isExamAction: boolean;
  isExamTesting: boolean;
  recordCollection: IRecordItem[];
  examGuardAlert: {
    title: string;
    content: string;
  }
} = {
  isExamAction: false,
  isExamTesting: false,
  recordCollection: [],
  examGuardAlert: {
    title: '確定要離開測驗？',
    content: '測驗紀錄將不會被保存',
  },
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
    setRecordCollection: (state, action: PayloadAction<IRecordItem[]>) => {
      const asignState = state;
      asignState.recordCollection = [...action.payload];

      const recordLocalData: IRecordLocalItem[] = [...action.payload].map(({
        id, startTime, finishTime, answerState,
      }) => ({
        id,
        startTime,
        finishTime,
        answerState: answerState.map((item) => ({
          id: item.id,
          answer: item.answer,
        })),
      }));

      localStorage.setItem('record', JSON.stringify([...recordLocalData]));
    },
    deleteRecordItem: (state, action: PayloadAction<number>) => {
      const asignState = state;
      const index: number = asignState.recordCollection.findIndex(({
        startTime,
      }: IRecordItem) => startTime === action.payload);

      if (index > -1) {
        asignState.recordCollection.splice(index, 1);
        localStorage.setItem('record', JSON.stringify([...asignState.recordCollection]));
      }
    },
  },
});

export const {
  setIsExamAction, setIsExamTesting, setRecordCollection, deleteRecordItem,
} = examSlice.actions;

export default examSlice.reducer;
