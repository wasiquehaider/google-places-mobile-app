import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import HistoryList from '../components/HistoryList';
import MapViewDisplay from '../components/MapViewDisplay';
import PlaceDetails from '../components/PlaceDetails';
import SearchBar from '../components/SearchBar';
import SuggestionsList from '../components/SuggestionsList';
import { addToHistory } from '../redux/slices/historySlice';
import { setSelectedPlace } from '../redux/slices/selectedPlaceSlice';
import { setSuggestions } from '../redux/slices/suggestionsSlice';
import { persistor, RootState, store } from '../redux/store';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const PLACES_AUTOCOMPLETE_URL = process.env.EXPO_PUBLIC_PLACES_AUTOCOMPLETE_URL;
const PLACE_DETAILS_URL = process.env.EXPO_PUBLIC_PLACE_DETAILS_URL;

// Thunks for API calls
const fetchSuggestionsThunk = (input: string) => async (dispatch: any) => {
  try {
    const url = `${PLACES_AUTOCOMPLETE_URL}?input=${encodeURIComponent(input)}&key=${GOOGLE_API_KEY}`;
    const res = await fetch(url);
    const json = await res.json();
    dispatch(setSuggestions(json.predictions || []));
  } catch (e) {
    dispatch(setSuggestions([]));
  }
};

const fetchPlaceDetailsThunk = (placeId: string, description: string) => async (dispatch: any) => {
  try {
    const url = `${PLACE_DETAILS_URL}?place_id=${placeId}&key=${GOOGLE_API_KEY}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.result) {
      const place = {
        name: json.result.name,
        address: json.result.formatted_address,
        location: {
          latitude: json.result.geometry.location.lat,
          longitude: json.result.geometry.location.lng,
        },
      };
      dispatch(setSelectedPlace(place));
      dispatch(addToHistory(place));
    }
  } catch (e) {
    // handle error
  }
};

const Main = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.query);
  const loading = false; // You can add loading state to Redux if needed
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Google Places Search',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { fontWeight: 'bold', fontSize: 22, color: '#222' },
    });
  }, [navigation]);

  useEffect(() => {
    if (query.length > 2) {
      dispatch(fetchSuggestionsThunk(query));
    } else {
      dispatch(setSuggestions([]));
    }
  }, [query]);

  const handleSelectSuggestion = (placeId: string, description: string) => {
    dispatch(fetchPlaceDetailsThunk(placeId, description));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar />
          <View style={styles.suggestionsOverlay} pointerEvents="box-none">
            <SuggestionsList onSelectPlace={handleSelectSuggestion} emphasized />
          </View>
        </View>
        {loading && <ActivityIndicator style={{ margin: 10 }} />}
        <View style={styles.mapWrapper}>
          <MapViewDisplay />
        </View>
        <PlaceDetails />
      </View>
      <View style={styles.historyBottomSheet}>
        <HistoryList emphasized />
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 0,
  },
  searchContainer: {
    zIndex: 10,
    paddingHorizontal: 16,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  suggestionsOverlay: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingHorizontal: 16,
  },
  mapWrapper: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 0,
    zIndex: 1,
  },
  historyBottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 90,
  },
}); 