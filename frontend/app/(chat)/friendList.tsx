import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';


const { width } = Dimensions.get('window');

const initialChats = [
  {
    id: '1',
    name: 'Rajesh Shukla',
    message: 'Hi brother...',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'online',
  },
  {
    id: '2',
    name: 'Shikhar',
    message: 'Hi brother...',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
    status: 'online',
  },
  {
    id: '3',
    name: 'Rajesh Shukla',
    message: 'Hi brother...',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: '2 min ago',
  },
  {
    id: '4',
    name: 'Akira',
    message: 'Hi brother...',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    status: '4 days ago',
  },
];

const ChatScreen = () => {
  const [chats, setChats] = useState(initialChats);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const handleDelete = (id: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    setActiveRow(null);
  };

  const closeRow = (id: string) => {
    if (activeRow && activeRow !== id && swipeableRefs.current[activeRow]) {
      swipeableRefs.current[activeRow]?.close();
    }
    setActiveRow(id);
  };

  const renderRightActions = (id: string) => (
    <View 
      className="flex-row items-center justify-center"
      style={{ width: 100 }}
    >
      <TouchableOpacity
        className="items-center justify-center h-full px-6"
        onPress={() => handleDelete(id)}
      >
        <Text className="text-red-500 font-medium">Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: typeof initialChats[0] }) => (
    <Swipeable
      ref={(ref) => (swipeableRefs.current[item.id] = ref)}
      renderRightActions={() => renderRightActions(item.id)}
      onSwipeableOpen={() => closeRow(item.id)}
      overshootRight={false}
      containerStyle={{ 
        borderBottomWidth: 0.5, 
        borderBottomColor: '#333',
        backgroundColor: '#1f1f23',
      }}
    >
      <TouchableOpacity 
  className="flex-row items-center py-4 px-5 bg-[#1f1f23]"
  activeOpacity={0.7}
  onPress={() => router.push(`/(chat)/chatPage`)}
>
        <Image
          source={{ uri: item.image }}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-1 ml-4">
          <Text className="text-white font-medium text-base">{item.name}</Text>
          <Text className="text-gray-400 text-sm mt-1" numberOfLines={1}>
            {item.message}
          </Text>
        </View>
        {item.status === 'online' ? (
          <Text className="text-green-500 text-xs">Online</Text>
        ) : (
          <Text className="text-gray-500 text-xs">{item.status}</Text>
        )}
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#1f1f23' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1f1f23" />

      
      {/* Header */}
      <View className="pt-14 pb-4 px-5 flex-row items-center border-b border-neutral-800">
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text className="text-white text-lg font-medium ml-1">
            {chats.length > 0 ? 'Chat' : 'My Buddies'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      {chats.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <View className="mb-4">
            <Feather name="message-circle" size={48} color="#555" />
          </View>
          <Text className="text-gray-400 text-lg mb-6">No Buddies right now</Text>
          <TouchableOpacity className="bg-transparent">
            <Text className="text-red-500 font-medium text-base">Explore Gym Buddy</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
        
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20, backgroundColor: '#1f1f23' }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </GestureHandlerRootView>
  );
};

export default ChatScreen;
