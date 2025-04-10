import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const HouseRulesScreen = () => {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (accepted) {
      router.push('/name');
    } else {
      alert('You must accept the rules to continue.');
    }
  };

  return (
    <View className="flex-1 bg-black px-6 pt-16 pb-10">
      <Text className="text-white text-3xl font-bold mb-6">Welcome to GRIND</Text>
      <Text className="text-gray-400 text-lg mb-4">Before you get started, please read our house rules:</Text>

      <ScrollView className="mb-6">
        {[
          'Respect all members at all times.',
          'No spam or self-promotion.',
          'Be honest about your fitness level.',
          'Use appropriate language and photos.',
          'Report inappropriate behavior immediately.',
          'This is a community. Lift each other up!',
        ].map((rule, index) => (
          <View key={index} className="mb-4">
            <Text className="text-white text-base">• {rule}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        className={`py-3 rounded-lg mb-4 ${accepted ? 'bg-white' : 'bg-gray-700'}`}
        onPress={() => setAccepted(!accepted)}
      >
        <Text className={`text-center font-semibold ${accepted ? 'text-black' : 'text-gray-300'}`}>
          {accepted ? 'Rules Accepted' : 'Accept Rules'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`py-3 rounded-lg ${accepted ? 'bg-white' : 'bg-gray-800'}`}
        onPress={handleContinue}
      >
        <Text className={`text-center font-semibold ${accepted ? 'text-black' : 'text-gray-500'}`}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HouseRulesScreen;
