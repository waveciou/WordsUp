import { configureStore } from '@reduxjs/toolkit';

// Slice (Reducer)
import screenWidthReducer from './slice/screenWidthSlice';
import menuControlReducer from './slice/menuControlSlice';
import loaderControlReducer from './slice/loaderControlSlice';

export const store = configureStore({
  reducer: {
    screenWidth: screenWidthReducer,
    menuControl: menuControlReducer,
    loaderControl: loaderControlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
