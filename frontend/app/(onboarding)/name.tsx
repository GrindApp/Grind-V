import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />
      <Pressable className="flex-1" onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 px-6 py-8">
            {/* Back Button */}
            <TouchableOpacity
              onPress={handleBack}
              className="w-10 h-10 rounded-full mb-6 flex items-center justify-center"
            >
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>

            {/* Header */}
            <View className="mb-12">
              <Text className="text-white text-3xl font-bold">What's your name?</Text>
              <Text className="text-gray-300 mt-2">
                This helps us personalize your experience
              </Text>
            </View>

            {/* Inputs */}
            <View className="mb-6">
              <Text className="text-gray-300 mb-2 text-sm font-medium">First Name</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                placeholderTextColor="#6B7280"
                className="border-b border-gray-700 mb-4 pb-2 text-white"
                autoFocus
                autoCapitalize="words"
                style={{ color: 'white' }}
              />

              <Text className="text-gray-300 mb-2 text-sm font-medium mt-3">Last Name</Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your last name"
                placeholderTextColor="#6B7280"
                className="border-b border-gray-700 pb-2 text-white"
                autoCapitalize="words"
                style={{ color: 'white' }}
              />
            </View>

            {/* Continue Button */}
            <View className="mt-auto">
              <TouchableOpacity
                className={`py-4 rounded-xl ${isValid ? 'bg-white' : 'bg-gray-700'}`}
                onPress={handleNext}
                disabled={!isValid}
                activeOpacity={0.8}
              >
                <Text
                  className={`text-center font-bold text-lg ${
                    isValid ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
};

export default NameScreen;
