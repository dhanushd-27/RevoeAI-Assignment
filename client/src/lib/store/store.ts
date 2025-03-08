import { configureStore } from '@reduxjs/toolkit';
import columnSlice from './columnNo/columnNoSlice';
import columnNameSlice from './columnNames/columnNamesSlice';

export const store = configureStore({
  reducer: {
    columnNo: columnSlice,
    columnNames: columnNameSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch