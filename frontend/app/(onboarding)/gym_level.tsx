import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const GymLevelScreen = () => {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedLevel) {
      router.push('/tags');
    } else {
      alert('Please select your gym level.');
    }
  };

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <Text className="text-white text-2xl font-bold mb-6">What's your gym level?</Text>

      {LEVELS.map((level) => (
        <TouchableOpacity
          key={level}
          onPress={() => setSelectedLevel(level)}
          className={`border rounded-lg px-4 py-3 mb-3 ${
            selectedLevel === level ? 'border-white bg-white' : 'border-gray-700'
          }`}
        >
          <Text
            className={`text-center text-base font-medium ${
              selectedLevel === level ? 'text-black' : 'text-white'
            }`}
          >
            {level}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className={`mt-6 py-3 rounded-lg ${selectedLevel ? 'bg-white' : 'bg-gray-700'}`}
        onPress={handleNext}
        disabled={!selectedLevel}
      >
        <Text className={`text-center font-semibold ${selectedLevel ? 'text-black' : 'text-gray-400'}`}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GymLevelScreen;
