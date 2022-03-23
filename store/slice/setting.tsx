import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  saveWords: boolean,
  saveRecord: boolean,
  updateInstall: boolean,
  saveOption: boolean,
} = {
  saveWords: false,
  saveRecord: false,
  updateInstall: true,
  saveOption: true,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setOptionSaveWords: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.saveWords = action.payload;
    },
    setOptionSaveRecord: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.saveRecord = action.payload;
    },
    setOptionUpdateInstall: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.updateInstall = action.payload;
    },
    setOptionSaveOption: (state, action: PayloadAction<boolean>) => {
      const asignState = state;
      asignState.saveOption = action.payload;
    },
  },
});

export const {
  setOptionSaveWords,
  setOptionSaveRecord,
  setOptionUpdateInstall,
  setOptionSaveOption,
} = settingSlice.actions;

export default settingSlice.reducer;
