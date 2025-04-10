import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const NameScreen = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const isValid = firstName.trim().length > 0 && lastName.trim().length > 0;

  const handleNext = () => {
    if (isValid) {
      router.push('/dob');
    } else {
      alert('Please enter both your first and last name.');
    }
  };

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <Text className="text-white text-2xl font-bold mb-6">What's your name?</Text>

      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        placeholderTextColor="#9CA3AF"
        className="bg-[#1F1F1F] text-white px-4 py-3 rounded-lg mb-4"
      />
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        placeholderTextColor="#9CA3AF"
        className="bg-[#1F1F1F] text-white px-4 py-3 rounded-lg mb-6"
      />

      <TouchableOpacity
        className={`py-3 rounded-lg ${isValid ? 'bg-white' : 'bg-gray-700'}`}
        onPress={handleNext}
        disabled={!isValid}
      >
        <Text className={`text-center font-semibold ${isValid ? 'text-black' : 'text-gray-400'}`}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NameScreen;
