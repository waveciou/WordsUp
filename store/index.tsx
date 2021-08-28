import { configureStore } from '@reduxjs/toolkit';

// Slice (Reducer)
import screenWidthReducer from './slice/screenWidthSlice';
import scrollValueReducer from './slice/scrollValueSlice';
import menuControlReducer from './slice/menuControlSlice';
import loaderControlReducer from './slice/loaderControlSlice';
import wordsCollectionReducer from './slice/wordsCollectionSlice';

export const store = configureStore({
  reducer: {
    screenWidth: screenWidthReducer,
    scrollValue: scrollValueReducer,
    menuControl: menuControlReducer,
    loaderControl: loaderControlReducer,
    wordsCollection: wordsCollectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
