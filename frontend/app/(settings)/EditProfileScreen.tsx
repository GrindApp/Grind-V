import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = () => {
  const [formData, setFormData] = useState({
    fullName: 'AYUSH VERMA',
    username: 'ayuver2970',
    bio: 'No Pain No Gain',
  });
  
  const [profileImage, setProfileImage] = useState('https://placehold.co/150x150');
  const [grindImage, setGrindImage] = useState('https://placehold.co/150x150?text=Grind');
  
  // Character count for bio
  const bioCharCount = formData.bio.length;
  const MAX_BIO_CHARS = 140;

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const pickImage = async (imageType: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permission to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (imageType === 'profile') {
        setProfileImage(result.assets[0].uri);
      } else {
        setGrindImage(result.assets[0].uri);
      }
    }
  };

  const handleSaveChanges = () => {
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleChangePassword = () => {
    Alert.alert('Password', 'Navigate to password change screen');
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 80 }}
        className="px-5"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mt-2 mb-8">
          <View className="flex-row items-center">
            <TouchableOpacity className="p-2 bg-[#1C1C1E] rounded-full">
              <Ionicons name="arrow-back" size={22} color="#FF3B30" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-semibold ml-3">Edit Profile</Text>
          </View>
          <TouchableOpacity onPress={handleSaveChanges}>
            <Text className="text-red-500 font-medium">Done</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Pictures */}
        <View className="flex-row justify-around mb-10">
          {/* Profile Pic */}
          <View className="items-center">
            <View className="relative mb-3">
              <View className="w-32 h-32 rounded-full overflow-hidden border-2 border-red-500">
                <Image
                  source={{ uri: profileImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity 
                className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full shadow"
                onPress={() => pickImage('profile')}
              >
                <Feather name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-300 text-sm">Profile Picture</Text>
          </View>

          {/* Grind Pic */}
          <View className="items-center">
            <View className="relative mb-3">
              <View className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-700">
                <Image
                  source={{ uri: grindImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity 
                className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full shadow"
                onPress={() => pickImage('grind')}
              >
                <Feather name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-300 text-sm">Grind Picture</Text>
          </View>
        </View>

        {/* Input Fields Section */}
        <View className="rounded-2xl bg-[#1C1C1E] p-5 mb-6">
          {/* Full Name */}
          <View className="mb-6">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-300 font-medium">Full Name</Text>
              <Feather name="user" size={16} color="#FF3B30" />
            </View>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#666"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
              className="bg-[#2C2C2E] text-white rounded-xl px-4 py-3.5 text-base"
            />
          </View>

          {/* Username */}
          <View className="mb-6">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-300 font-medium">Username</Text>
              <Feather name="at-sign" size={16} color="#FF3B30" />
            </View>
            <TextInput
              placeholder="Choose a username"
              placeholderTextColor="#666"
              value={formData.username}
              onChangeText={(text) => handleInputChange('username', text)}
              className="bg-[#2C2C2E] text-white rounded-xl px-4 py-3.5 text-base"
            />
          </View>

          {/* Bio */}
          <View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-300 font-medium">Bio</Text>
              <Feather name="edit-3" size={16} color="#FF3B30" />
            </View>
            <View className="bg-[#2C2C2E] rounded-xl px-4 py-3 relative">
              <TextInput
                placeholder="Write something about yourself"
                placeholderTextColor="#666"
                value={formData.bio}
                onChangeText={(text) => handleInputChange('bio', text.slice(0, MAX_BIO_CHARS))}
                className="text-white text-base"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <Text className={`absolute bottom-2 right-4 text-xs ${bioCharCount > MAX_BIO_CHARS * 0.8 ? 'text-red-500' : 'text-gray-500'}`}>
  {bioCharCount}/{MAX_BIO_CHARS}
</Text>

            </View>
          </View>
        </View>

        {/* Additional Settings */}
        <View className="rounded-2xl bg-[#1C1C1E] p-5 mb-6">
          <TouchableOpacity 
            className="flex-row justify-between items-center py-3"
            onPress={handleChangePassword}
          >
            <View className="flex-row items-center">
              <Feather name="lock" size={18} color="#FF3B30" className="mr-3" />
              <Text className="text-white font-medium">Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              <MaterialIcons name="privacy-tip" size={18} color="#FF3B30" className="mr-3" />
              <Text className="text-white font-medium">Privacy Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              <Feather name="bell" size={18} color="#FF3B30" className="mr-3" />
              <Text className="text-white font-medium">Notification Preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          className="mt-6 py-4 bg-red-600 rounded-xl items-center shadow"
          onPress={handleSaveChanges}
        >
          <Text className="text-white font-bold tracking-wide text-base">SAVE CHANGES</Text>
        </TouchableOpacity>
        
        {/* Delete Account Option */}
        <TouchableOpacity className="mt-10 items-center">
          <Text className="text-gray-500">Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;