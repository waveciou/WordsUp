import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISettingsOption {
  saveWords: boolean,
  saveRecord: boolean,
  updateInstall: boolean,
  saveOption: boolean,
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
      const _value = _state.value;
      _state.value = { ..._value, saveWords: action.payload };
    },
    setOptionSaveRecord: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      const _value = _state.value;
      _state.value = { ..._value, saveRecord: action.payload };
    },
    setOptionUpdateInstall: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      const _value = _state.value;
      _state.value = { ..._value, updateInstall: action.payload };
    },
    setOptionSaveOption: (state, action: PayloadAction<boolean>) => {
      const _state = state;
      const _value = _state.value;
      _state.value = { ..._value, saveOption: action.payload };
    },
  },
});

export const {
  setOptionSaveWords,
  setOptionSaveRecord,
  setOptionUpdateInstall,
  setOptionSaveOption,
} = settingsOptionSlice.actions;

export default settingsOptionSlice.reducer;
