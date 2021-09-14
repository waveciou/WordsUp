import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISettingsOption {
  saveWords?: boolean,
  saveRecord?: boolean,
  updateInstall?: boolean,
  saveOption?: boolean,
}

const initialState: { value: ISettingsOption } = {
  value: {
    saveWords: false,
    saveRecord: false,
    updateInstall: true,
    saveOption: true,
  },
};

export const settingsOptionSlice = createSlice({
  name: 'settingsOption',
  initialState,
  reducers: {
    setOptionSaveWords: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      const { value } = _state;
      _state.value = { ...value, saveWords: action.payload };
    },
    setOptionSaveRecord: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      const { value } = _state;
      _state.value = { ...value, saveRecord: action.payload };
    },
    setOptionUpdateInstall: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      const { value } = _state;
      _state.value = { ...value, updateInstall: action.payload };
    },
    setOptionSaveOption: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      const { value } = _state;
      _state.value = { ...value, saveOption: action.payload };
    },
    setSettingsOption: (state, action: PayloadAction<any>) => {
      const _state = state;
      const { value } = _state;
      _state.value = { ...value, ...action.payload };
    },
  },
});

export const {
  setOptionSaveWords,
  setOptionSaveRecord,
  setOptionUpdateInstall,
  setOptionSaveOption,
  setSettingsOption,
} = settingsOptionSlice.actions;

export default settingsOptionSlice.reducer;
