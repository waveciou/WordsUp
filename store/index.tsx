import commonReducer from '@/Slice/common';
import collectionReducer from '@/Store/slice/collection';
import settingReducer from '@/Store/slice/setting';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    collection: collectionReducer,
    setting: settingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
