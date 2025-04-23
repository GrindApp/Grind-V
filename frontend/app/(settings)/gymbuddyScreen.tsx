import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import {
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

type Buddy = {
  id: string;
  name: string;
  message: string;
  image: string;
  status?: string;
};

const initialData = {
  requests: [
    {
      id: '1',
      name: 'Rajesh Shukla',
      message: 'Hi brother...',
      image: 'https://i.pravatar.cc/150?img=1',
      status: 'Online',
    },
    {
      id: '2',
      name: 'Ankit Verma',
      message: "Let's hit gym!",
      image: 'https://i.pravatar.cc/150?img=2',
      status: '2h ago',
    },
  ],
  added: [
    {
      id: '3',
      name: 'Neha Kapoor',
      message: "Let's stay fit 💪",
      image: 'https://i.pravatar.cc/150?img=3',
      status: 'Online',
    },
    {
      id: '4',
      name: 'Vikram Singh',
      message: 'Daily workout partner',
      image: 'https://i.pravatar.cc/150?img=4',
      status: '30m ago',
    },
    {
      id: '5',
      name: 'Priya Patel',
      message: 'Need a spotter today?',
      image: 'https://i.pravatar.cc/150?img=5',
      status: '1h ago',
    },
  ],
};

const GymBuddyScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'requests' | 'added'>('requests');
  const [buddies, setBuddies] = useState(initialData);
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const animateTab = (tab: 'requests' | 'added') => {
    setActiveTab(tab);
  };

  const handleAccept = (user: Buddy) => {
    setBuddies((prev) => ({
      requests: prev.requests.filter((r) => r.id !== user.id),
      added: [...prev.added, { ...user, status: user.status || '' }],
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
    closeRow(user.id);
  };

  const closeRow = (id: string) => swipeableRefs.current[id]?.close();

  const renderHeader = () => (
    <View className="flex-row justify-between items-center px-4 py-4">
      <View className="flex-row items-center">
        <TouchableOpacity className="bg-zinc-900 p-2 rounded-full mr-3">
          <Ionicons name="arrow-back" size={20} color="#FF3B30" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Gym Buddies</Text>
      </View>
      <TouchableOpacity className="bg-zinc-900 p-2 rounded-full">
        <Feather name="search" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  // const renderHeader = () => (
  //   <View className="flex-row items-center px-4 py-4">
  //      <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center">
  //     <Ionicons name="arrow-back" size={24} color="#fff" />
  //     <Text className="text-white text-base ml-2">My Buddies</Text>
  //   </TouchableOpacity>
  //   </View>
  // );

  const renderTabs = () => (
    <View className="px-4 pb-4">
      <View className="flex-row bg-zinc-900 rounded-xl overflow-hidden h-12">
        {(['requests', 'added'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 justify-center items-center ${
              activeTab === tab ? 'bg-zinc-800' : ''
            }`}
            onPress={() => animateTab(tab)}
          >
            <Text className={`font-semibold text-xs ${
              activeTab === tab ? 'text-white' : 'text-neutral-400'
            }`}>
              {tab === 'requests'
                ? `REQUESTS (${buddies.requests.length})`
                : `MY BUDDIES (${buddies.added.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBuddyCard = ({ item }: { item: Buddy }) => {
    const isOnline = item.status === 'Online';

    const userCard = (
      <View className="flex-row items-center space-x-4 flex-1">
        <View className="relative">
          <Image source={{ uri: item.image }} className="w-14 h-14 rounded-full" />
          {isOnline && (
            <View className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-zinc-900" />
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-medium text-base">{item.name}</Text>
            {!isOnline && <Text className="text-neutral-400 text-xs">{item.status}</Text>}
          </View>
          <Text className="text-neutral-400 mt-1 text-sm">{item.message}</Text>
        </View>
      </View>
    );

    if (activeTab === 'added') {
      return (
        <Swipeable
          ref={(ref) => (swipeableRefs.current[item.id] = ref)}
          renderRightActions={() => (
            <View className="flex-row w-40">
              <TouchableOpacity className="w-20 justify-center items-center bg-blue-500">
                <Ionicons name="chatbubble-outline" size={22} color="#fff" />
                <Text className="text-white text-xs mt-1">Message</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-20 justify-center items-center bg-red-500"
                onPress={() => handleDelete(item)}
              >
                <Ionicons name="trash-outline" size={22} color="#fff" />
                <Text className="text-white text-xs mt-1">Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        >
          <View className="bg-zinc-900 mx-4 mb-3 p-4 rounded-2xl flex-row justify-between items-center">
            {userCard}
            <TouchableOpacity className="p-2">
              <Feather name="more-vertical" size={18} color="#7F7F7F" />
            </TouchableOpacity>
          </View>
        </Swipeable>
      );
    }

    return (
      <View className="bg-zinc-900 mx-4 mb-3 p-4 rounded-2xl">
        <View className="flex-row justify-between items-center">
          {userCard}
          <View className="flex-row space-x-3 ml-3">
            <TouchableOpacity
              onPress={() => handleReject(item)}
              className="bg-zinc-800 w-10 h-10 rounded-full justify-center items-center"
            >
              <Ionicons name="close" size={22} color="#FF3B30" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAccept(item)}
              className="bg-zinc-800 w-10 h-10 rounded-full justify-center items-center"
            >
              <Ionicons name="checkmark" size={22} color="#34C759" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyList = () => (
    <View className="items-center justify-center py-10 px-6">
      <View className="bg-zinc-900 p-6 rounded-full mb-5">
        {activeTab === 'requests' ? (
          <MaterialIcons name="person-add-disabled" size={36} color="#7F7F7F" />
        ) : (
          <FontAwesome5 name="user-friends" size={34} color="#7F7F7F" />
        )}
      </View>
      <Text className="text-white text-lg font-semibold mb-2">
        {activeTab === 'requests' ? 'No Friend Requests' : 'No Buddies Added Yet'}
      </Text>
      <Text className="text-neutral-400 text-center leading-5 mb-3">
        {activeTab === 'requests'
          ? 'When someone sends you a request, it will appear here.'
          : 'Find gym buddies nearby to start working out together.'}
      </Text>
      {activeTab === 'added' && (
        <TouchableOpacity className="bg-red-500 px-6 py-3 rounded-xl mt-2">
          <Text className="text-white font-semibold">Find Buddies</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <GestureHandlerRootView className="flex-1">
        {renderHeader()}
        {renderTabs()}
        <FlatList
          data={activeTab === 'requests' ? buddies.requests : buddies.added}
          keyExtractor={(item) => item.id}
          renderItem={renderBuddyCard}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default GymBuddyScreen;
