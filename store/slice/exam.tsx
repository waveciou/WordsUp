/* eslint-disable no-console */
import { set } from 'idb-keyval';

import { IRecordItem, IRecordLocalItem } from '@/Interfaces/exam';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isExamAction: boolean;
  isExamTesting: boolean;
  recordCollection: IRecordItem[];
  examGuardAlert: {
    title: string;
    content: string;
  };
} = {
  isExamAction: false,
  isExamTesting: false,
  recordCollection: [],
  examGuardAlert: {
    title: '確定要離開測驗？',
    content: '測驗紀錄將不會被保存',
  },
};

const updateRecordLocalData = (payload: IRecordItem[]) => {
  const localData: IRecordLocalItem[] = payload.map(
    ({ id, startTime, finishTime, answerState }) => ({
      id,
      startTime,
      finishTime,
      answerState: answerState.map((item) => ({
        id: item.id,
        answer: item.answer,
      })),
    })
  );

  set('record', [...localData])
    .then(() => console.log('set record 儲存成功'))
    .catch((error) => console.log('set record 儲存失敗', error));
};

export const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setIsExamAction: (state, action: PayloadAction<boolean>) => {
      const assignState = state;
      assignState.isExamAction = action.payload;
    },
    setIsExamTesting: (state, action: PayloadAction<boolean>) => {
      const assignState = state;
      assignState.isExamTesting = action.payload;
    },
    setRecordCollection: (state, action: PayloadAction<IRecordItem[]>) => {
      const assignState = state;
      assignState.recordCollection = [...action.payload];
      updateRecordLocalData(assignState.recordCollection);
    },
    deleteRecordItem: (state, action: PayloadAction<number>) => {
      const assignState = state;
      const index: number = assignState.recordCollection.findIndex(
        ({ startTime }: IRecordItem) => startTime === action.payload
      );

      if (index > -1) {
        assignState.recordCollection.splice(index, 1);
        updateRecordLocalData(assignState.recordCollection);
      }
    },
  },
});

export const {
  setIsExamAction,
  setIsExamTesting,
  setRecordCollection,
  deleteRecordItem,
} = examSlice.actions;

export default examSlice.reducer;
