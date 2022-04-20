import { IWordItem } from '@/Src/interfaces/word';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  dateId: string;
  dateCaption: string;
  dailyWords: IWordItem[];
  isShowTestingGuide: boolean;
} = {
  dateId: '',
  dateCaption: '',
  dailyWords: [],
  isShowTestingGuide: false,
};

export const dailySlice = createSlice({
  name: 'daily',
  initialState,
  reducers: {
    setDateId: (state, action: PayloadAction<string>) => {
      const asignState = state;
      asignState.dateId = action.payload;
    },
    setDateCaption: (state, action: PayloadAction<string>) => {
      const asignState = state;
      asignState.dateCaption = action.payload;
    },
    setDailyWords: (state, action: PayloadAction<IWordItem[]>) => {
      const asignState = state;
      asignState.dailyWords = [...action.payload];
    },
    setIsShowTestingGuide: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.isShowTestingGuide = action.payload;
    },
  },
});

export const {
  setDateId, setDateCaption, setDailyWords, setIsShowTestingGuide,
} = dailySlice.actions;

export default dailySlice.reducer;
