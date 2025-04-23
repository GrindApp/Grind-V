import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const ratingGyms = [
  {
    id: '1',
    name: 'Gold’s Gym',
    image: {
      uri: 'https://images.unsplash.com/photo-1542766788-a2f588f447ee?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.0.3&q=60&w=3000',
    },
    distance: '500 meters away',
    rating: '5.0',
  },
  {
    id: '2',
    name: 'Anytime Fitness',
    image: {
      uri: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW1wdHklMjBneW18ZW58MHx8MHx8fDA%3D&ixlib=rb-4.0.3&q=60&w=3000',
    },
    distance: '700 meters away',
    rating: '5.0',
  },
  {
    id: '3',
    name: 'Crunch Fitness',
    image: {
      uri: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzcyUyMGNlbnRlcnxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.0.3&q=60&w=3000',
    },
    distance: '900 meters away',
    rating: '5.0',
  },
  {
    id: '4',
    name: 'Equinox',
    image: {
      uri: 'https://images.unsplash.com/photo-1740895307920-0ba63bffc1c9?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWwlMjBneW18ZW58MHx8MHx8fDA%3D&ixlib=rb-4.0.3&q=60&w=3000',
    },
    distance: '1.2 km away',
    rating: '4.8',
  },
  {
    id: '5',
    name: '24 Hour Fitness',
    image: {
      uri: 'https://images.unsplash.com/photo-1542766788-a2f588f447ee?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.0.3&q=60&w=3000',
    },
    distance: '1.5 km away',
    rating: '4.7',
  },
];




const RatingArenas = () => {
  const router = useRouter();

  return (
    <View className="px-6 my-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-white text-xl font-bold">The 5 ⭐ rating arenas</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/(home)/rating-arenas')}>
          <Text className="text-sm text-gray-400 font-medium">See all</Text>
        </TouchableOpacity>
      </View>

      {/* Gym List */}
      <FlatList
        data={ratingGyms}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="w-48 bg-[#23262B] rounded-2xl p-3">
            <Image
              source={item.image}
              className="w-full h-28 rounded-xl mb-3"
              resizeMode="cover"
            />
            <Text className="text-white font-semibold text-sm mb-1" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="text-gray-400 text-xs">{item.distance}</Text>
            <Text className="text-yellow-400 text-xs mt-1 font-medium">⭐ {item.rating}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RatingArenas;
