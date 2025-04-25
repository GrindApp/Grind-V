import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import GymCard from "../components/GymCard";
import { Alert, FlatList, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Gym {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: any;
  tags: string[];
  rating: string;
}

const initialGyms: Gym[] = [
  {
    id: "101",
    name: "Iron Paradise",
    address: "Sector 21, Dwarka, New Delhi",
    distance: "450 meters away",
    image: { uri: "https://source.unsplash.com/1600x900/?gym,weights" },
    tags: ["Yoga", "Zumba", "Pilates"],
    rating: "4.8",
  },
  {
    id: "102",
    name: "Flex Gym & Fitness",
    address: "Rajouri Garden, New Delhi",
    distance: "300 meters away",
    image: { uri: "https://source.unsplash.com/1600x900/?gym,fitness" },
    tags: ["Yoga", "Zumba", "Pilates"],
    rating: "4.6",
  },
];

const SavedGyms = () => {
  const [gyms, setGyms] = useState<Gym[]>(initialGyms);

  const handleUnsave = (id: string) => {
    Alert.alert(
      "Remove Gym",
      "Are you sure you want to remove this gym from your saved list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => setGyms((prev) => prev.filter((gym) => gym.id !== id)),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1C1C1E]">
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Saved Gyms</Text>
        <View className="w-6" />
      </View>

      {gyms.length > 0 ? (
        <FlatList
          data={gyms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GymCard
              name={item.name}
              images={[item.image.uri]}
              distance={item.distance}
              rating={item.rating}
              tags={item.tags}
              isFavorite={true}
              onFavoritePress={() => handleUnsave(item.id)}
              onPress={() => {}}
            />
          )}
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
