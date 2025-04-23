import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const ratingGyms = [
  {
    id: '1',
    name: 'Martial Art and Strength Zone',
    image: { uri: 'https://source.unsplash.com/1600x900/?gym,fitness' },
    distance: '500 meters away',
    rating: ' 5.0',
  },
  {
    id: '2',
    name: 'Planet Fitness',
    image: { uri: 'https://source.unsplash.com/1600x900/?gym,fitness' },
    distance: '500 meters away',
    rating: ' 5.0',
  },
  {
    id: '3',
    name: 'The Ultimate Muscle Gym',
    image: { uri: 'https://source.unsplash.com/1600x900/?gym,fitness' },
    distance: '500 meters away',
    rating: ' 5.0',
  },
];

const RatingArenas = () => {
  return (
    <View className="my-4 px-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white text-lg font-semibold">The 5 ⭐ rating arenas</Text>
        <Text className="text-sm text-gray-400">See all</Text>
      </View>

      <FlatList
        horizontal
        data={ratingGyms}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mr-4 w-48 rounded-xl overflow-hidden bg-[#2C2C2E]">
            <Image
              source={item.image}
              className="h-28 w-full"
              resizeMode="cover"
            />
            <View className="p-2">
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-white text-sm font-semibold">{item.name}</Text>
              <Text className="text-gray-400 text-xs mt-1">{item.distance}</Text>
              <Text className="text-yellow-400 text-xs mt-1">{item.rating}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default RatingArenas;
