import { IWordItem } from '@/Src/interfaces/word';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  dateId: string;
  dateCaption: string;
  dailyWords: IWordItem[];
  isShowGuideButton: boolean;
} = {
  dateId: '',
  dateCaption: '',
  dailyWords: [],
  isShowGuideButton: false,
};

export const dailySlice = createSlice({
  name: 'daily',
  initialState,
  reducers: {
    setDateId: (state, action: PayloadAction<string>) => {
      const assignState = state;
      assignState.dateId = action.payload;
    },
    setDateCaption: (state, action: PayloadAction<string>) => {
      const assignState = state;
      assignState.dateCaption = action.payload;
    },
    setDailyWords: (state, action: PayloadAction<IWordItem[]>) => {
      const assignState = state;
      assignState.dailyWords = [...action.payload];
    },
    setIsShowGuideButton: (state, action: PayloadAction<boolean>) => {
      const assignState = state;
      assignState.isShowGuideButton = action.payload;
    },
  },
});

export const {
  setDateId,
  setDateCaption,
  setDailyWords,
  setIsShowGuideButton,
} = dailySlice.actions;

export default dailySlice.reducer;
