import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../redux/slices/querySlice';
import { RootState } from '../redux/store';

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.query);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for places..."
        value={query}
        onChangeText={text => dispatch(setQuery(text))}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f5f5f7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    fontSize: 17,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
});

export default SearchBar; 