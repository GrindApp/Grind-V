import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const QueryScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [query, setQuery] = useState('');
   const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#1C1C1E] px-6">
      {/* Header */}
      <View className="flex-row items-center mt-2 mb-6">
        <TouchableOpacity  onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold ml-4">Submit Your Query</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="space-y-10">
            {/* Name */}
            <View>
              <Text className="text-white mb-2 font-medium">Name</Text>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
                className="bg-[#2C2C2E] text-white rounded-lg px-4 py-4 text-base mb-6"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-white mb-2 font-medium">Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                className="bg-[#2C2C2E] text-white rounded-lg px-4 py-4 text-base mb-6"
              />
            </View>

            {/* Subject */}
            <View>
              <Text className="text-white mb-2 font-medium">Subject</Text>
              <TextInput
                placeholder="Subject of your query"
                placeholderTextColor="#888"
                value={subject}
                onChangeText={setSubject}
                className="bg-[#2C2C2E] text-white rounded-lg px-4 py-4 text-base mb-6"
              />
            </View>

            {/* Query */}
            <View>
              <Text className="text-white mb-2 font-medium">Query</Text>
              <TextInput
                placeholder="Type your query here"
                placeholderTextColor="#888"
                value={query}
                onChangeText={setQuery}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                className="bg-[#2C2C2E] text-white rounded-lg px-4 py-4 text-base h-40 mb-6"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity className="mt-4 bg-white py-5 rounded-xl items-center shadow-lg">
              <Text className="text-[#1C1C1E] text-base font-bold tracking-wide">SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default QueryScreen;
