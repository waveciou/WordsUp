import { configureStore } from '@reduxjs/toolkit';

// Slice (Reducer)
import counterReducer from './slice/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch