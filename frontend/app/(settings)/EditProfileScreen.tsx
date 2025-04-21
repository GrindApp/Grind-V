import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

const EditProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#1C1C1E] px-5">
      {/* Header */}
      <View className="flex-row items-center mt-2 mb-6">
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text className="text-white text-xl font-semibold ml-4">Edit Your Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Profile Pictures */}
        <View className="flex-row justify-between px-2 mb-12">
          {/* Profile Pic */}
          <View className="items-center relative">
            <View className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-500">
              <Image
                source={{ uri: 'https://placehold.co/150x150' }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity className="absolute bottom-2 right-2 bg-black p-1 rounded-full border border-white">
              <Feather name="edit-2" size={16} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xs mt-3">Edit Profile Picture</Text>
          </View>

          {/* Grind Pic */}
          <View className="items-center relative">
            <View className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-500">
              <Image
                source={{ uri: 'https://placehold.co/150x150?text=Grind' }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity className="absolute bottom-2 right-2 bg-black p-1 rounded-full border border-white">
              <Feather name="edit-2" size={16} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xs mt-3">Edit Grind Picture</Text>
          </View>
        </View>

        {/* Input Fields */}
        <View className="space-y-10">
          <View>
            <Text className="text-white mb-2">Full Name</Text>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#999"
              value="AYUSH VERMA"
              className="bg-[#2C2C2E] text-white rounded-lg px-4 py-3 text-base mb-6"
            />
          </View>

          <View>
            <Text className="text-white mb-2">Username</Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#999"
              value="ayuver2970"
              className="bg-[#2C2C2E] text-white rounded-lg px-4 py-3 text-base mb-6"
            />
          </View>

          <View>
            <Text className="text-white mb-2">Bio</Text>
            <View className="flex-row items-center bg-[#2C2C2E] rounded-lg px-4 py-3">
              <TextInput
                placeholder="Bio"
                placeholderTextColor="#999"
                value="No Pain No Gain"
                className="text-white flex-1 text-base"
                maxLength={140}
              />
              <Text className="text-gray-400 text-xs ml-2">15/140</Text>
            </View>
          </View>
        </View>

        {/* Change Password */}
        <TouchableOpacity className="mt-10">
          <Text className="text-red-500 font-semibold">CHANGE PASSWORD?</Text>
        </TouchableOpacity>

        {/* Save Changes */}
        <TouchableOpacity className="mt-10 py-4 bg-white rounded-xl items-center shadow-lg">
          <Text className="text-[#1C1C1E] font-bold tracking-widest text-base">SAVE CHANGES</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
