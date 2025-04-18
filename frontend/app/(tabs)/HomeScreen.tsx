import React from 'react';
import { View, FlatList } from 'react-native';
import ActivityCarousel from '../components/homepage/ActivityCarousel';
import RatingArenas from '../components/homepage/RatingArenas';
import CategoryGrid from '../components/homepage/CategoryGrid';
import GymList from '../components/homepage/GymList';

const HomeScreen = () => {
  const sections = [
    { key: 'activity', render: () => <ActivityCarousel /> },
    { key: 'rating', render: () => <RatingArenas /> },
    { key: 'category', render: () => <CategoryGrid /> },
    { key: 'gyms', render: () => <GymList /> },
  ];

  return (
    <FlatList className='flex-1 bg-[#1C1C1E]'
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <View>{item.render()}</View>}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;
