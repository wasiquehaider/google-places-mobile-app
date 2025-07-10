import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Suggestion {
  description: string;
  place_id: string;
}

const initialState: Suggestion[] = [];

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setSuggestions: (state: Suggestion[], action: PayloadAction<Suggestion[]>) => action.payload,
    clearSuggestions: () => [],
  },
});

export const { setSuggestions, clearSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer; 