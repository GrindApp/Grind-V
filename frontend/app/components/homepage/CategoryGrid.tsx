import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  { id: '1', label: 'Weight Training', icon: <FontAwesome5 name="dumbbell" size={20} color="#fff" /> },
  { id: '2', label: 'Cardio Training', icon: <MaterialCommunityIcons name="run-fast" size={22} color="#fff" /> },
  { id: '3', label: 'Athletics', icon: <MaterialCommunityIcons name="karate" size={22} color="#fff" /> },
  { id: '4', label: 'Recreational', icon: <MaterialCommunityIcons name="basketball" size={22} color="#fff" /> },
  { id: '5', label: 'Aerobic/Dance', icon: <MaterialCommunityIcons name="music-circle" size={22} color="#fff" /> },
  { id: '6', label: 'Collaborative', icon: <MaterialCommunityIcons name="account-group" size={22} color="#fff" /> },
  { id: '7', label: 'Yoga/Relaxation', icon: <MaterialCommunityIcons name="meditation" size={22} color="#fff" /> },
  { id: '8', label: 'Nutrition Training', icon: <MaterialCommunityIcons name="food-apple" size={22} color="#fff" /> },
];

const CategoryGrid = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Type</Text>

      <FlatList
        data={categories}
        numColumns={4}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            {item.icon}
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 12,
    margin: 4,
    minWidth: (Dimensions.get('window').width - 64) / 4, // responsive width
  },
  label: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 6,
  },
});

export default CategoryGrid;
