import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import GymCard from '../GymCard';

interface Gym {
  rating: string;
  id: string;
  name: string;
  distance: string;
  image: any;
  tags: string[];
}

const mockGyms: Gym[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Gym ${i + 1}`,
  distance: `${Math.floor(Math.random() * 1000)} meters away`,
  image: { uri: `https://via.placeholder.com/600x300?text=Gym+${i + 1}` }, // Placeholder images
  tags: ['Yoga', 'Zumba', 'Weight Training', 'Crossfit', 'Cardio', 'Strength'],
  rating: '5.0',
}));

const GymList = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);

  const fetchGyms = () => {
    // Assuming fetching gyms here; for now, use mockGyms as the source
    setGyms(mockGyms);
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  return (
    <View className="mb-10 px-4">
      <Text className="text-white text-lg font-semibold mb-4">All Gyms</Text>

      {/* ScrollView for displaying all gyms using GymCard */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {gyms.slice(1).map((gym) => (
          <View key={gym.id} className="mb-6">
            <GymCard
              name={gym.name}
              images={[gym.image.uri]} // Pass the image URI as an array
              distance={gym.distance}
              rating={gym.rating}
              tags={gym.tags}
            />
          </View>
        ))}
      </ScrollView>

      {/* Add a loading indicator */}
      {gyms.length === 0 && (
        <View className="h-10 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

export default GymList;
