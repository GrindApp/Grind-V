import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const FinalWelcomeScreen = () => {
  const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => router.replace('/(auth)/login'), 3000);
  // }, []);

  return (
    <View className="flex-1 bg-primary justify-center items-center px-6">
      <LottieView
        source={{
          uri: 'https://raw.githubusercontent.com/react-native-lottie/react-native-lottie/master/example/assets/8857-lottie-flower.json',
        }}
        autoPlay
        loop={false}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Text className="text-white text-3xl font-bold mb-4 text-center">Welcome to GRIND</Text>
      <Text className="text-gray-400 text-center mb-10">
        You’re all set. Let’s start your fitness journey.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace('/(tabs)/HomeScreen')}
        className="bg-white py-3 px-6 rounded-lg"
      >
        <Text className="text-black font-semibold text-center">Start Exploring</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinalWelcomeScreen;
