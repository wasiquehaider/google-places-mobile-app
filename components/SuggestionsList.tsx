import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface SuggestionsListProps {
  onSelectPlace: (placeId: string, description: string) => void;
  emphasized?: boolean;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ onSelectPlace, emphasized }) => {
  const suggestions = useSelector((state: RootState) => state.suggestions);
  const query = useSelector((state: RootState) => state.query);

  if (!suggestions.length || query.length < 3) return null;

  return (
    <View style={[styles.container, emphasized && styles.emphasizedContainer]}>
      <FlatList
        data={suggestions}
        keyExtractor={item => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.item, emphasized && styles.emphasizedItem]} onPress={() => onSelectPlace(item.place_id, item.description)}>
            <Text style={[styles.text, emphasized && styles.emphasizedText]}>{item.description}</Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
    maxHeight: 140,
  },
  emphasizedContainer: {
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9ff',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  emphasizedItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: '#ececff',
  },
  text: {
    fontSize: 16,
    color: '#222',
  },
  emphasizedText: {
    fontWeight: '600',
    color: '#2a2a5a',
  },
});

export default SuggestionsList; 