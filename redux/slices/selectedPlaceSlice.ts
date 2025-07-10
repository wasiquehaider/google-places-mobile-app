import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Place {
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const initialState: Place | null = null;

const selectedPlaceSlice = createSlice({
  name: 'selectedPlace',
  initialState,
  reducers: {
    setSelectedPlace: (state: Place | null, action: PayloadAction<Place>) => action.payload,
    clearSelectedPlace: () => null,
  },
});

export const { setSelectedPlace, clearSelectedPlace } = selectedPlaceSlice.actions;
export default selectedPlaceSlice.reducer; 