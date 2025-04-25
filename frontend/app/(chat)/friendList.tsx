import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  Animated,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import clsx from "clsx";

const { width } = Dimensions.get("window");

// Types
interface Chat {
  id: string;
  name: string;
  message: string;
  image: string;
  status: string;
  unread?: number;
  time?: string;
}

const initialChats: Chat[] = [
  {
    id: "1",
    name: "Rajesh Shukla",
    message: "Let's meet at the gym at 6pm tomorrow?",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "online",
    unread: 2,
    time: "2:30 PM",
  },
  {
    id: "2",
    name: "Shikhar",
    message: "I found a new pre-workout that works great",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    status: "online",
    time: "Yesterday",
  },
  {
    id: "3",
    name: "David Kim",
    message: "Thanks for the training tips, they helped a lot!",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    status: "2 min ago",
    unread: 3,
    time: "9:45 AM",
  },
  {
    id: "4",
    name: "Akira",
    message: "See you at the protein shake bar after session",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    status: "4 days ago",
    time: "Monday",
  },
];

const ChatScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [chats, setChats] = useState(initialChats);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const filteredChats = chats.filter((chat) => {
    if (activeTab === "online" && chat.status !== "online") return false;
    if (activeTab === "unread" && !chat.unread) return false;
    if (searchQuery) {
      return (
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

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

  const renderRightActions = (
    id: string,
    progress: Animated.AnimatedInterpolation<number>
  ) => (
    <Animated.View
      className="bg-red-800/20 flex-row items-center justify-center"
      style={{
        width: 100,
        transform: [
          {
            translateX: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity
        className="items-center justify-center h-full w-full"
        onPress={() => handleDelete(id)}
      >
        <LinearGradient
          colors={["rgba(239, 68, 68, 0.2)", "rgba(239, 68, 68, 0.1)"]}
          className="w-10 h-10 rounded-full items-center justify-center mb-1"
        >
          <Feather name="trash-2" size={20} color="#EF4444" />
        </LinearGradient>
        <Text className="text-accent font-medium">Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderItem = ({ item }: { item: Chat }) => (
    <Swipeable
      ref={(ref) => (swipeableRefs.current[item.id] = ref)}
      renderRightActions={(progress) => renderRightActions(item.id, progress)}
      overshootRight={false}
      friction={2}
      onSwipeableWillOpen={() => closeRow(item.id)}
    >
      <TouchableOpacity
        className="flex-row items-center py-4 px-5 bg-primary border-b border-neutral-800"
        activeOpacity={0.7}
        onPress={() => router.push(`/(chat)/chatPage`)}
      >
        <View className="relative">
          <Image
            source={{ uri: item.image }}
            className="w-14 h-14 rounded-full"
          />
          {item.status === "online" && (
            <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-primary" />
          )}
        </View>
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-semibold text-base">
              {item.name}
            </Text>
            <Text className="text-xs text-accent">{item.time}</Text>
          </View>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-secondary text-sm pr-4" numberOfLines={1}>
              {item.message}
            </Text>
            {item.unread && (
              <View className="bg-accent min-w-6 h-6 rounded-full items-center justify-center px-1.5">
                <Text className="text-white text-xs font-bold">
                  {item.unread}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#1C1E20" />

      <SafeAreaView className="bg-primary">
        <View className="px-5 pt-2 pb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-semibold ml-2">
              Gym Buddies
            </Text>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-accent/10 rounded-full items-center justify-center">
            <Feather name="edit" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <View className="px-5 pb-3">
          <View className="flex-row items-center bg-primary/30 border border-neutral-700 rounded-xl px-4 py-2.5">
            <Feather name="search" size={18} color="#999" />
            <TextInput
              className="flex-1 ml-2 text-white text-base"
              placeholder="Search conversations"
              placeholderTextColor="#999"
              selectionColor="#EF4444"
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View className="flex-row px-5 py-3 border-b border-neutral-800">
          {["all", "online", "unread"].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={clsx(
                "mr-4 pb-2",
                activeTab === tab && "border-b-2 border-accent"
              )}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                className={clsx(
                  "text-base",
                  activeTab === tab
                    ? "text-white font-medium"
                    : "text-secondary"
                )}
              >
                {tab === "all"
                  ? "All Chats"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

      {filteredChats.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <LinearGradient
            colors={["rgba(239, 68, 68, 0.1)", "rgba(28, 30, 32, 0.1)"]}
            className="p-8 rounded-full mb-6"
          >
            <Feather name="message-circle" size={54} color="#EF4444" />
          </LinearGradient>
          <Text className="text-white text-xl font-semibold mb-2">
            No Conversations Yet
          </Text>
          <Text className="text-secondary text-base mb-8 text-center">
            Connect with gym enthusiasts and start chatting with your fitness
            buddies
          </Text>
          <TouchableOpacity
            className="bg-accent px-8 py-3.5 rounded-xl flex-row items-center"
            activeOpacity={0.8}
          >
            <Feather name="users" size={18} color="white" />
            <Text className="text-white font-semibold text-base ml-2">
              Find Gym Buddies
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 bg-primary">
          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => {
              if (activeRow && swipeableRefs.current[activeRow]) {
                swipeableRefs.current[activeRow]?.close();
                setActiveRow(null);
              }
            }}
          />
        </View>
      )}

      {filteredChats.length > 0 && (
        <View className="absolute bottom-6 right-6">
          <TouchableOpacity
            className="w-14 h-14 bg-accent rounded-full items-center justify-center shadow-lg shadow-black/50"
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="chat-plus" size={26} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default ChatScreen;
