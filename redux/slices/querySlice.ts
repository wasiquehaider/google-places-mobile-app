import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state: string, action: PayloadAction<string>) => action.payload,
  },
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer; 