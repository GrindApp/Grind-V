import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/app/components/SearchBar';

const categories = [
  { id: '1', name: 'STRENGHT TRAINING', image: 'https://picsum.photos/id/1016/1600/900' },
  { id: '2', name: 'YOGA', image: 'https://picsum.photos/id/1020/1600/900' },
  { id: '3', name: 'CARDIO', image: 'https://picsum.photos/id/1013/1600/900' },
  { id: '4', name: 'STRETCHING', image: 'https://picsum.photos/id/1022/1600/900' },
  { id: '5', name: 'ENDURANCE TRAINING', image: 'https://picsum.photos/id/1011/1600/900' },
  { id: '6', name: 'PUSH WORKOUT', image: 'https://picsum.photos/id/1015/1600/900' },
];

const mockSearchResults = ['Manmohan Arora', 'Man', 'Manoj', 'Mandir'];

const ExploreScreen = () => {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (text: string) => {
    setSearch(text);
    setShowResults(text.length > 0);
  };

  const filteredResults = mockSearchResults.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className='flex-1 bg-primary'>
<KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-primary px-4 pt-12"
    >
      <Text className="text-white text-3xl font-bold mb-5">Explore Now</Text>

      {/* Search Bar */}
      <View className="relative mb-6">
        {/* <View className="flex-row items-center bg-neutral-800 rounded-full px-4 py-3">
          <Search color="gray" size={20} />
          <TextInput
            value={search}
            onChangeText={handleSearch}
            placeholder="Search by gym name, gym location..."
            placeholderTextColor="#aaa"
            className="text-white flex-1 ml-2"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => { setSearch(''); setShowResults(false); }}>
              <X color="gray" />
            </TouchableOpacity>
          )}
        </View> */}

<SearchBar
  value={search}
  onChange={handleSearch}
  onClear={() => {
    setSearch('');
    setShowResults(false);
     
  }}
  placeholder="Search by gym name, gym location..."
/>

{showResults && (
  <View className="absolute top-[100px] left-0 right-0 bg-neutral-900 rounded-xl shadow-lg z-10 max-h-48">
    {filteredResults.map((result, index) => (
      <Text
        key={index}
        className="text-white px-4 py-3 border-b border-neutral-700"
      >
        {result}
      </Text>
    ))}
  </View>
)}


        {/* Floating Dropdown */}
        {showResults && (
          <View className="absolute top-14 left-0 right-0 bg-neutral-900 rounded-xl shadow-lg z-10 max-h-48">
            {filteredResults.map((result, index) => (
              <Text
                key={index}
                className="text-white px-4 py-3 border-b border-neutral-700"
              >
                {result}
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* Category Tiles */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <Pressable className="mb-4 rounded-2xl overflow-hidden">
            {({ pressed }) => (
              <ImageBackground
                source={{ uri: item.image }}
                className={`h-36 justify-end`}
                imageStyle={{ borderRadius: 16 }}
              >
                <View className={`bg-gradient-to-t from-black/70 to-black/10 px-4 py-3 ${pressed ? 'opacity-75' : 'opacity-100'}`}>
                  <Text className="text-white text-center text-xl font-semibold">
                    {item.name}
                  </Text>
                </View>
              </ImageBackground>
            )}
          </Pressable>
        )}
      />
    </KeyboardAvoidingView>
    </SafeAreaView>
    
  );
};

export default ExploreScreen;
