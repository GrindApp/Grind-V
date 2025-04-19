import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ExerciseDetailScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-black px-6 pt-16">

      {/* Header Image */}
      <Image
        source={'https://picsum.photos/id/1015/1600/900'}
        style={{ height: 240, width: '100%', borderRadius: 24, shadowColor: 'black', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 }}
  contentFit="cover"
  transition={300}
      />

      {/* Content */}
      <View className="mt-8 space-y-8 pb-16">
        {/* Section: Purpose */}
        <View>
          <Text className="text-white text-xl font-semibold mb-2">What it is for!</Text>
          <Text className="text-gray-300 text-sm leading-relaxed">
            Hamstring stretches reduce tension in the back of the legs, improve posture, and increase flexibility for better performance in workouts.
          </Text>
        </View>

        {/* Section: Instructions */}
        <View>
          <Text className="text-white text-xl font-semibold mb-2">What to do</Text>
          <Text className="text-gray-300 text-sm leading-relaxed">
            Begin with a light warmup. Then stretch your hamstrings by reaching forward while seated or standing, holding for 20–30 seconds without bouncing.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExerciseDetailScreen;
