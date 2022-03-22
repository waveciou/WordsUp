/* eslint-disable import/order */
import commonReducer from '@/Slice/common';
import settingsOptionReducer from '@/Slice/settingsOptionSlice';
import collectionReducer from '@/Store/slice/collection';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    collection: collectionReducer,
    settingsOption: settingsOptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
