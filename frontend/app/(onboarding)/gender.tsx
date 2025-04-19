import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

const GenderScreen = () => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedGender) {
      router.push('/gym_level');
    } else {
      alert('Please select your gender.');
    }
  };

  return (
    <View className="flex-1 bg-primary px-6 justify-center">
      <Text className="text-white text-2xl font-bold mb-6">What's your gender?</Text>

      {GENDERS.map((gender) => (
        <TouchableOpacity
          key={gender}
          onPress={() => setSelectedGender(gender)}
          className={`border rounded-lg px-4 py-3 mb-3 ${
            selectedGender === gender ? 'border-white bg-white' : 'border-gray-700'
          }`}
        >
          <Text
            className={`text-center text-base font-medium ${
              selectedGender === gender ? 'text-black' : 'text-white'
            }`}
          >
            {gender}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className={`mt-6 py-3 rounded-lg ${selectedGender ? 'bg-white' : 'bg-gray-700'}`}
        onPress={handleNext}
        disabled={!selectedGender}
      >
        <Text className={`text-center font-semibold ${selectedGender ? 'text-black' : 'text-gray-400'}`}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderScreen;
