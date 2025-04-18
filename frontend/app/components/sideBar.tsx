// components/Sidebar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

type SidebarProps = {
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <View className="flex-1 bg-[#1C1C1E] p-4">
      {/* Logo & Close */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-xl font-semibold">
          <Text style={{ color  : '#FF3B30' }}>G</Text>RIND
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity className="flex-row items-center py-3">
          <Ionicons name="person-circle-outline" size={22} color="white" />
          <Text className="text-white text-base ml-3">My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-3">
          <Ionicons name="people-outline" size={22} color="white" />
          <Text className="text-white text-base ml-3">Gym Buddies</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-3">
          <Feather name="settings" size={22} color="white" />
          <Text className="text-white text-base ml-3">Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-3">
          <Feather name="help-circle" size={22} color="white" />
          <Text className="text-white text-base ml-3">Need Help</Text>
        </TouchableOpacity>

        <View className="border-t border-gray-700 my-4" />

        <TouchableOpacity className="flex-row items-center py-3">
          <MaterialIcons name="logout" size={22} color="white" />
          <Text className="text-white text-base ml-3">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <Text className="text-red-500 text-xs text-center mt-6">
        © GRIND ASSOCIATION 2024
      </Text>
    </View>
  );
};

export default Sidebar;
