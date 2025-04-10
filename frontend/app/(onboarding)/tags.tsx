import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const TAG_OPTIONS = [
  'Yoga',
  'Bodybuilding',
  'CrossFit',
  'Cardio',
  'Running',
  'Cycling',
  'HIIT',
  'Powerlifting',
  'Pilates',
  'Boxing',
  'Calisthenics',
];

const TagsScreen = () => {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleNext = () => {
    if (selectedTags.length > 0) {
      router.push('/photos_screen');
    } else {
      alert('Please select at least one tag.');
    }
  };

  return (
    <View className="flex-1 bg-black px-6 pt-12">
      <Text className="text-white text-2xl font-bold mb-4">What are you into?</Text>
      <Text className="text-gray-400 mb-4">Pick as many as you like</Text>

      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} showsVerticalScrollIndicator={false}>
        {TAG_OPTIONS.map((tag) => {
          const selected = selectedTags.includes(tag);
          return (
            <TouchableOpacity
              key={tag}
              onPress={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full border m-1 ${
                selected ? 'bg-white border-white' : 'border-gray-600'
              }`}
            >
              <Text className={selected ? 'text-black font-semibold' : 'text-white'}>{tag}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        className={`mt-6 py-3 rounded-lg ${selectedTags.length > 0 ? 'bg-white' : 'bg-gray-700'}`}
        onPress={handleNext}
        disabled={selectedTags.length === 0}
      >
        <Text
          className={`text-center font-semibold ${
            selectedTags.length > 0 ? 'text-black' : 'text-gray-400'
          }`}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TagsScreen;
