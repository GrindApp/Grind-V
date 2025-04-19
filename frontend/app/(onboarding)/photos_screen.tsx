import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const MAX_PHOTOS = 6;

const PhotosScreen = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState<(string | null)[]>(Array(MAX_PHOTOS).fill(null));

  const pickImage = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Permission required', 'Allow access to your photos to continue');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const updatedPhotos = [...photos];
      updatedPhotos[index] = result.assets[0].uri;
      setPhotos(updatedPhotos);
    }
  };

  const handleNext = () => {
    const hasAtLeastOne = photos.some((p) => p !== null);
    if (hasAtLeastOne) {
      router.push('/location');
    } else {
      Alert.alert('Upload Required', 'Please upload at least one photo.');
    }
  };

  const renderItem = ({ item, index }: { item: string | null; index: number }) => (
    <TouchableOpacity
      onPress={() => pickImage(index)}
      className="w-[30%] aspect-square bg-[#1F1F1F] m-1 rounded-lg items-center justify-center border border-gray-600"
    >
      {item ? (
        <Image source={{ uri: item }} className="w-full h-full rounded-lg" />
      ) : (
        <Feather name="plus" size={30} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-primary px-6 pt-12">
      <Text className="text-white text-2xl font-bold mb-2">Add your best photos</Text>
      <Text className="text-gray-400 mb-6">Upload up to 6 photos</Text>

      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <TouchableOpacity
        onPress={handleNext}
        className={`mt-8 py-3 rounded-lg ${photos.some((p) => p) ? 'bg-white' : 'bg-gray-700'}`}
      >
        <Text
          className={`text-center font-semibold ${
            photos.some((p) => p) ? 'text-black' : 'text-gray-400'
          }`}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotosScreen;
