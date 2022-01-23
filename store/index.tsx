/* eslint-disable import/order */
import isMountedSliceReducer from '@/Slice/isMountedSlice';
import loaderControlReducer from '@/Slice/loaderControlSlice';
import menuControlReducer from '@/Slice/menuControlSlice';
import screenWidthReducer from '@/Slice/screenWidthSlice';
import scrollValueReducer from '@/Slice/scrollValueSlice';
import settingsOptionReducer from '@/Slice/settingsOptionSlice';
import wordsCollectionReducer from '@/Slice/wordsCollectionSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    screenWidth: screenWidthReducer,
    scrollValue: scrollValueReducer,
    menuControl: menuControlReducer,
    loaderControl: loaderControlReducer,
    wordsCollection: wordsCollectionReducer,
    settingsOption: settingsOptionReducer,
    isMounted: isMountedSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
