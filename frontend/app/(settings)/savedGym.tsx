import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Gym {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: any;
  tags: string;
  rating: number;
}

const initialGyms: Gym[] = [
  {
    id: '101',
    name: 'Iron Paradise',
    address: 'Sector 21, Dwarka, New Delhi',
    distance: '450 meters away',
    image: { uri: 'https://source.unsplash.com/1600x900/?gym,weights' },
    tags: 'Weight Training, Cardio, Crossfit',
    rating: 4.8,
  },
  {
    id: '102',
    name: 'Flex Gym & Fitness',
    address: 'Rajouri Garden, New Delhi',
    distance: '300 meters away',
    image: { uri: 'https://source.unsplash.com/1600x900/?gym,fitness' },
    tags: 'Yoga, Zumba, Pilates +2 more',
    rating: 4.6,
  },
];

const SavedGyms = () => {
    const navigation = useNavigation();
  const [gyms, setGyms] = useState<Gym[]>(initialGyms);

  const handleUnsave = (id: string) => {
    Alert.alert('Remove Gym', 'Are you sure you want to remove this gym from your saved list?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setGyms((prev) => prev.filter((gym) => gym.id !== id)),
      },
    ]);
  };

  const renderGym = ({ item }: { item: Gym }) => (
    <View className="mb-4 mx-4 bg-[#2C2C2E] rounded-xl overflow-hidden relative">
      <Image source={item.image} className="h-36 w-full" resizeMode="cover" />

      {/* Tag and Unsave */}
      <View className="absolute top-2 right-2 flex-row items-center space-x-2">
        <View className="bg-green-600 px-2 py-1 rounded-md">
          <Text className="text-white text-xs font-medium">Saved</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleUnsave(item.id)}
          className="bg-black/60 p-1.5 rounded-full"
        >
          <Feather name="x" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View className="p-3 space-y-1">
        <Text numberOfLines={1} className="text-white text-base font-semibold">{item.name}</Text>
        <Text className="text-gray-400 text-sm">{item.address}</Text>
        <Text className="text-gray-400 text-sm">{item.distance}</Text>
        <Text className="text-gray-400 text-sm">{item.tags}</Text>
        <View className="flex-row items-center space-x-1 mt-1">
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text className="text-white text-sm font-medium">{item.rating.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#1C1C1E]">
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity  onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Saved Gyms</Text>
        <View className="w-6" />
      </View>

      {gyms.length > 0 ? (
        <FlatList
          data={gyms}
          keyExtractor={(item) => item.id}
          renderItem={renderGym}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-gray-400 text-center text-base">
            You haven't saved any gyms yet.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SavedGyms;
