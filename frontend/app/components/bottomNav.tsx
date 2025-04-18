// components/BottomNav.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useState } from 'react';

type Tab = 'Home' | 'GymBuddy' | 'Search';

const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('GymBuddy');

  return (
    <View className="flex-row justify-around items-center bg-[#1C1C1E] py-3 border-t border-gray-800">
      {/* Home Tab */}
      <TouchableOpacity onPress={() => setActiveTab('Home')} className="items-center">
        <Ionicons
          name="home-outline"
          size={22}
          color={activeTab === 'Home' ? '#FF3B30' : '#D1D1D6'}
        />
        <Text className={`text-xs mt-1 ${activeTab === 'Home' ? 'text-red-500' : 'text-gray-400'}`}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Gym Buddy Tab */}
      <TouchableOpacity onPress={() => setActiveTab('GymBuddy')} className="items-center">
        <Ionicons
          name="people-outline"
          size={22}
          color={activeTab === 'GymBuddy' ? '#FF3B30' : '#D1D1D6'}
        />
        <Text
          className={`text-xs mt-1 ${
            activeTab === 'GymBuddy' ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          Gym Buddy
        </Text>
      </TouchableOpacity>

      {/* Search Tab */}
      <TouchableOpacity onPress={() => setActiveTab('Search')} className="items-center">
        <Feather
          name="search"
          size={22}
          color={activeTab === 'Search' ? '#FF3B30' : '#D1D1D6'}
        />
        <Text
          className={`text-xs mt-1 ${
            activeTab === 'Search' ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;
