import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View className="flex-1 bg-black justify-center items-center px-6">
      <Image className="w-36 h-36 mb-8" />
      <Text className="text-white text-4xl font-bold mb-10">Welcome to GRIND</Text>

      <TouchableOpacity
        className="bg-white w-full py-4 rounded-lg mb-4"
        onPress={() => navigation.navigate('PhoneLogin')}
      >
        <Text className="text-black text-center font-semibold">Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border border-white w-full py-4 rounded-lg"
        onPress={() => navigation.navigate('PhoneLogin')}
      >
        <Text className="text-white text-center font-semibold">Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
