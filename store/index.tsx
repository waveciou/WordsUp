import collectionReducer from '@/Slice/collection';
import commonReducer from '@/Slice/common';
import examReducer from '@/Slice/exam';
import settingReducer from '@/Slice/setting';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    collection: collectionReducer,
    exam: examReducer,
    setting: settingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
