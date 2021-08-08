import { configureStore } from '@reduxjs/toolkit';

// Slice (Reducer)
import screenWidthReducer from './slice/screenWidthSlice';
import menuControlReducer from './slice/menuControlSlice';

export const store = configureStore({
  reducer: {
    screenWidth: screenWidthReducer,
    menuControl: menuControlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
