import React from 'react';
import { View, FlatList } from 'react-native';
import ActivityCarousel from '../components/homepage/ActivityCarousel';
import RatingArenas from '../components/homepage/RatingArenas';
import CategoryGrid from '../components/homepage/CategoryGrid';
import GymList from '../components/homepage/GymList';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const sections = [
    { key: 'activity', render: () => <ActivityCarousel /> },
    { key: 'rating', render: () => <RatingArenas /> },
    { key: 'category', render: () => <CategoryGrid /> },
    { key: 'gyms', render: () => <GymList /> },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#1C1C1E]">
    <FlatList
      className="flex-1"
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <View>{item.render()}</View>}
      showsVerticalScrollIndicator={false}
    />
  </SafeAreaView>
  );
};

export default HomeScreen;
