import collectionReducer from '@/Slice/collection';
import commonReducer from '@/Slice/common';
import examinationReducer from '@/Slice/examination';
import settingReducer from '@/Slice/setting';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    collection: collectionReducer,
    examination: examinationReducer,
    setting: settingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
