import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const stretches = [
  'Hamstring Stretches',
  'Back Stretches',
  'Neck Stretches',
  'Shoulder Stretches',
  'Waist Stretches',
  'Hand Stretches',
];

const ExerciseOverviewScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-black">
      {/* Cover Image */}
      <View className="relative h-80">
        <ImageBackground
          source={{ uri: 'https://picsum.photos/id/1015/1600/900' }}
          className="h-full w-full justify-end"
          imageStyle={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
        >
          <View className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-b-[32px]" />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 z-10"
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>

          <View className="px-6 pb-7">
            <Text className="text-white text-4xl font-bold leading-tight">
              Stretching{'\n'}Exercises
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Main Content */}
      <View className="px-6 pt-8 pb-12 space-y-10">
        {/* Benefits */}
        <View>
          <Text className="text-white text-xl font-semibold mb-2">Benefits of Stretching</Text>
          <Text className="text-gray-300 text-sm leading-relaxed">
            Stretching helps improve flexibility, blood circulation, and reduces risk of injuries. It can also enhance recovery, improve posture, and decrease muscle soreness.
          </Text>
        </View>

        {/* Explore Section */}
        <View>
          <Text className="text-white text-xl font-semibold mb-4">Explore the Exercises</Text>
          <View className="space-y-3">
            {stretches.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(`/exercise-details/:id`)}
                className="bg-zinc-800 rounded-2xl px-5 py-4 flex-row justify-between items-center shadow-sm shadow-black/40 active:scale-95"
              >
                <Text className="text-white text-base font-medium">{item}</Text>
                <Ionicons name="chevron-forward" size={18} color="white" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Types */}
        <View>
          <Text className="text-white text-xl font-semibold mb-2">Types of Stretches</Text>
          <Text className="text-gray-300 text-sm leading-relaxed">
            There are various types like static, dynamic, and passive stretches. Each serves a different purpose and suits different fitness levels and goals.
          </Text>
        </View>

        {/* Subscribe */}
        <TouchableOpacity className="bg-red-600 rounded-2xl py-4 items-center shadow-md shadow-red-800 active:scale-95 mt-4">
          <Text className="text-white font-bold text-base tracking-wider uppercase">
            Subscribe @29rupee/month
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExerciseOverviewScreen;
