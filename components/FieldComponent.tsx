import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const FieldComponent = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === item ? styles.selectedCategory : null,
          ]}
          onPress={() => onSelectCategory(item)}
          accessibilityLabel={`Select ${item}`}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item ? styles.selectedText : null,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    borderWidth: 2,
    borderColor: '#246BFD',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  selectedCategory: {
    backgroundColor: '#246BFD',
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#246BFD',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default FieldComponent;
