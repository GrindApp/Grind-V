import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  const navItems = [
    {
      name: 'Home',
      route: '/HomeScreen',
      icon: (active: boolean) => (
        <Ionicons
          name={active ? 'home' : 'home-outline'}
          size={22}
          color={active ? '#FF3B30' : '#8E8E93'}
        />
      ),
    },
    {
      name: 'Gym Buddy',
      route: '/gymBuddy',
      icon: (active: boolean) => (
        <Ionicons
          name={active ? 'people' : 'people-outline'}
          size={22}
          color={active ? '#FF3B30' : '#8E8E93'}
        />
      ),
    },
    {
      name: 'Search',
      route: '/explore',
      icon: (active: boolean) => (
        <Feather
          name="search"
          size={22}
          color={active ? '#FF3B30' : '#8E8E93'}
        />
      ),
    },
  ];

  return (
    <SafeAreaView className="bg-gray-900" edges={['bottom']}>
      <View className="flex-row justify-around items-center py-2 px-4 bg-gray-900 border-t border-gray-800">
        {navItems.map((item) => {
          const active = isActive(item.route);
          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => router.push(item.route)}
              className={`items-center py-2 ${active ? 'bg-gray-800 rounded-xl' : ''}`}
              style={{ minWidth: 70 }}
            >
              {item.icon(active)}
              <Text
                className={`text-xs font-medium mt-1 ${active ? 'text-red-500' : 'text-gray-400'}`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default BottomNav;
