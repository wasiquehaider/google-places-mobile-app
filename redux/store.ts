import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import historyReducer from './slices/historySlice';
import queryReducer from './slices/querySlice';
import selectedPlaceReducer from './slices/selectedPlaceSlice';
import suggestionsReducer from './slices/suggestionsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['history'],
};

const rootReducer = combineReducers({
  query: queryReducer,
  suggestions: suggestionsReducer,
  selectedPlace: selectedPlaceReducer,
  history: historyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 