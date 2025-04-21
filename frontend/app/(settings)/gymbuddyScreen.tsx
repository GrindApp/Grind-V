import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type Buddy = {
  id: string;
  name: string;
  message: string;
  image: string;
};

const initialData = {
  requests: [
    {
      id: '1',
      name: 'Rajesh Shukla',
      message: 'Hi brother...',
      image: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Ankit Verma',
      message: 'Let’s hit gym!',
      image: 'https://i.pravatar.cc/150?img=2',
    },
  ],
  added: [
    {
      id: '3',
      name: 'Neha Kapoor',
      message: 'Let’s stay fit 💪',
      image: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: '4',
      name: 'Vikram Singh',
      message: 'Daily workout partner',
      image: 'https://i.pravatar.cc/150?img=4',
    },
  ],
};

const GymBuddyScreen = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'added'>('requests');
  const [buddies, setBuddies] = useState(initialData);
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const handleAccept = (user: Buddy) => {
    setBuddies((prev) => ({
      requests: prev.requests.filter((r) => r.id !== user.id),
      added: [...prev.added, user],
    }));
  };

  const handleReject = (user: Buddy) => {
    setBuddies((prev) => ({
      ...prev,
      requests: prev.requests.filter((r) => r.id !== user.id),
    }));
  };

  const handleDelete = (user: Buddy) => {
    setBuddies((prev) => ({
      ...prev,
      added: prev.added.filter((buddy) => buddy.id !== user.id),
    }));
  };

  const closeRow = (id: string) => {
    if (swipeableRefs.current[id]) {
      swipeableRefs.current[id]?.close();
    }
  };

  const renderRightActions = (id: string) => (
    <View className="flex-row items-center justify-center" style={{ width: 100 }}>
      <TouchableOpacity
        className="items-center justify-center h-full px-6"
        onPress={() => {
          const user = buddies.added.find((buddy) => buddy.id === id);
          if (user) {
            handleDelete(user); // Delete the buddy from added list
          }
          closeRow(id);
        }}
      >
        <Text className="text-red-500 font-medium">Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View className="flex-row items-center px-4 py-4">
      <Ionicons name="arrow-back" size={24} color="#fff" />
      <Text className="text-white text-base ml-2">My Buddies</Text>
    </View>
  );

  const renderTabs = () => (
    <View className="flex-row px-4">
      <TouchableOpacity onPress={() => setActiveTab('requests')}>
        <Text className={`text-lg font-bold ${activeTab === 'requests' ? 'text-white' : 'text-gray-600'}`}>
          FRIEND REQUEST
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('added')} className="ml-4">
        <Text className={`text-lg font-bold ${activeTab === 'added' ? 'text-white' : 'text-gray-600'}`}>
          ADDED FRIEND
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBuddyCard = ({ item }: { item: Buddy }) => (
    <View>
      {activeTab === 'added' ? (
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
          <View className="flex-row items-center justify-between bg-[#1f1f23] rounded-xl px-4 py-3 mt-4 mx-4">
            <View className="flex-row items-center">
              <Image source={{ uri: item.image }} className="w-12 h-12 rounded-full" />
              <View className="ml-3">
                <Text className="text-white font-semibold">{item.name}</Text>
                <Text className="text-gray-400 text-sm">{item.message}</Text>
              </View>
            </View>
          </View>
        </Swipeable>
      ) : (
        <View className="flex-row items-center justify-between bg-[#1f1f23] rounded-xl px-4 py-3 mt-4 mx-4">
          <View className="flex-row items-center">
            <Image source={{ uri: item.image }} className="w-12 h-12 rounded-full" />
            <View className="ml-3">
              <Text className="text-white font-semibold">{item.name}</Text>
              <Text className="text-gray-400 text-sm">{item.message}</Text>
            </View>
          </View>
          {activeTab === 'requests' && (
            <View className="flex-row space-x-6">
              <TouchableOpacity className="mr-2" onPress={() => handleAccept(item)}>
                <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReject(item)}>
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );

  const currentData = activeTab === 'requests' ? buddies.requests : buddies.added;

  return (
    <SafeAreaView className="bg-primary flex-1">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1 bg-primary">
          {renderHeader()}
          {renderTabs()}
          <FlatList
            data={currentData}
            keyExtractor={(item) => item.id}
            renderItem={renderBuddyCard}
            contentContainerStyle={{ paddingVertical: 16 }}
            ListEmptyComponent={
              <Text className="text-center text-gray-400 mt-10">
                No {activeTab === 'requests' ? 'requests' : 'buddies'} yet
              </Text>
            }
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default GymBuddyScreen;
