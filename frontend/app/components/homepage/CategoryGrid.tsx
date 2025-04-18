import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
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
    <View className="my-4 px-4">
      <Text className="text-white text-lg font-semibold mb-2">Your Type</Text>

      <FlatList
        data={categories}
        numColumns={4}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 m-2 items-center justify-center bg-[#2C2C2E] p-3 rounded-xl"
            activeOpacity={0.7}
          >
            {item.icon}
            <Text className="text-xs text-white text-center mt-2">{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryGrid;
