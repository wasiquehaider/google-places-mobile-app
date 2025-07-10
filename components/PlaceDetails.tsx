import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PlaceDetails = () => {
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);
  if (!selectedPlace) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{selectedPlace.name}</Text>
      <Text style={styles.address}>{selectedPlace.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginTop: -18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
    color: '#222',
  },
  address: {
    fontSize: 15,
    color: '#666',
  },
});

export default PlaceDetails; 