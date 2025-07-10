import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlace } from '../redux/slices/selectedPlaceSlice';
import { RootState } from '../redux/store';

interface HistoryListProps {
  emphasized?: boolean;
}

const HistoryList: React.FC<HistoryListProps> = ({ emphasized }) => {
  const history = useSelector((state: RootState) => state.history);
  const dispatch = useDispatch();

  if (!history.length) return null;

  return (
    <View style={[styles.container, emphasized && styles.emphasizedContainer]}>
      <Text style={[styles.title, emphasized && styles.emphasizedTitle]}>Search History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, idx) => item.name + idx}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.item, emphasized && styles.emphasizedItem]} onPress={() => dispatch(setSelectedPlace(item))}>
            <Text style={[styles.place, emphasized && styles.emphasizedPlace]}>{item.name}</Text>
            <Text style={[styles.address, emphasized && styles.emphasizedAddress]}>{item.address}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  emphasizedContainer: {
    borderRadius: 18,
    backgroundColor: '#f9f9ff',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    padding: 12,
    marginTop: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#222',
  },
  emphasizedTitle: {
    fontSize: 18,
    color: '#2a2a5a',
    marginBottom: 10,
    fontWeight: '700',
  },
  list: {
    maxHeight: 160,
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  emphasizedItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: '#ececff',
    paddingHorizontal: 10,
  },
  place: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
  },
  emphasizedPlace: {
    color: '#2a2a5a',
    fontSize: 16,
    fontWeight: '600',
  },
  address: {
    color: '#666',
    fontSize: 13,
  },
  emphasizedAddress: {
    color: '#6a6a8a',
    fontSize: 13,
  },
});

export default HistoryList; 