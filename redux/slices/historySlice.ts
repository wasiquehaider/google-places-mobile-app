import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Place {
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const initialState: Place[] = [];

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state: Place[], action: PayloadAction<Place>) => {
      // Remove duplicates by name, add to front
      return [action.payload, ...state.filter((h: Place) => h.name !== action.payload.name)];
    },
    setHistory: (state: Place[], action: PayloadAction<Place[]>) => action.payload,
    clearHistory: () => [],
  },
});

export const { addToHistory, setHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer; 