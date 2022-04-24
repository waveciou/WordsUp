import collectionReducer from '@/Slice/collection';
import commonReducer from '@/Slice/common';
import dailyReducer from '@/Slice/daily';
import examReducer from '@/Slice/exam';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    collection: collectionReducer,
    daily: dailyReducer,
    exam: examReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
