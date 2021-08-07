import { configureStore } from '@reduxjs/toolkit';

// Slice (Reducer)
import counterReducer from './slice/counterSlice';
import screenWidthReducer from './slice/screenWidthSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    screenWidth: screenWidthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
