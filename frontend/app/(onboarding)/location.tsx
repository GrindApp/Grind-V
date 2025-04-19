import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const LocationScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const requestLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setLoading(false);
      Alert.alert('Permission Denied', 'Location permission is required to continue.');
      return;
    }

    try {
      await Location.getCurrentPositionAsync({});
      setLoading(false);
      router.push('/final-welcome');
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'Unable to fetch your location.');
    }
  };

  return (
    <View className="flex-1 bg-primary px-6 justify-center items-center">
      <Feather name="map-pin" size={64} color="white" className="mb-4" />
      <Text className="text-white text-2xl font-bold mb-4 text-center">Enable location</Text>
      <Text className="text-gray-400 text-center mb-10">
        GRIND uses your location to find nearby gym partners and training buddies.
      </Text>

      <TouchableOpacity
        className="bg-white px-6 py-4 rounded-lg w-full"
        onPress={requestLocation}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Text className="text-black text-center font-semibold">Enable Location</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LocationScreen;
