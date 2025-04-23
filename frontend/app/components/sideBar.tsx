import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useRouter } from "expo-router";

type SidebarProps = {
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const screenHeight = Dimensions.get('window').height;

  const router = useRouter();
  
  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <SafeAreaView edges={['top', 'bottom']} style={{ height: '100%' }}>
        <View className="flex-1 p-4">
          {/* Logo & Close */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-semibold">
              <Text style={{ color: '#FF3B30' }}>G</Text>RIND
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={()=>router.push("/(settings)/userSettings")} className="flex-row items-center py-3">
              <Ionicons name="person-circle-outline" size={22} color="white" />
              <Text className="text-white text-base ml-3">My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>router.push("/(settings)/gymbuddyScreen")} className="flex-row items-center py-3">
              <Ionicons name="people-outline" size={22} color="white" />
              <Text className="text-white text-base ml-3">Gym Buddies</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>router.push("/(settings)/savedGym")} className="flex-row items-center py-3">
              <Ionicons name="save" size={22} color="white" />
              <Text className="text-white text-base ml-3">My OG Collection</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>router.push("/(settings)/EditProfileScreen")}  className="flex-row items-center py-3">
              <Feather name="settings" size={22} color="white" />
              <Text className="text-white text-base ml-3">Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>router.push("/(settings)/QueryScreen")} className="flex-row items-center py-3">
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
          <Text className="text-red-500 text-xs text-center mt-6 mb-4">
            © GRIND ASSOCIATION 2024
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: '80%',
  }
});

export default Sidebar;