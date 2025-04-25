import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

import ActivityCarousel from '../../components/homepage/ActivityCarousel';
import RatingArenas from '../../components/homepage/RatingArenas';
import CategoryGrid from '../../components/homepage/CategoryGrid';
import GymList from '../../components/homepage/GymList';
import Sidebar from '../../components/sideBar';

const { width: screenWidth } = Dimensions.get('window');
const SIDEBAR_WIDTH = screenWidth * 0.8;

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const sections = useMemo(() => [
    
    { key: 'activity', render: () => <ActivityCarousel />, },
    { key: 'rating', render: () => <RatingArenas /> },
    { key: 'category', render: () => <CategoryGrid /> },
    { key: 'gyms', render: () => <GymList /> },
  ], []);

  const animateSidebar = useCallback((open: boolean) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: open ? 0 : -SIDEBAR_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: open ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  useEffect(() => {
    animateSidebar(isSidebarOpen);
  }, [isSidebarOpen]);

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) =>
      Math.abs(gesture.dx) > Math.abs(gesture.dy) && Math.abs(gesture.dx) > 5,
    onPanResponderMove: (_, gesture) => {
      const dx = Math.min(0, gesture.dx);
      slideAnim.setValue(dx);
      fadeAnim.setValue(1 + dx / SIDEBAR_WIDTH);
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx < -SIDEBAR_WIDTH * 0.3) {
        setIsSidebarOpen(false);
      } else {
        animateSidebar(true);
      }
    }
  }), []);

  const renderHeader = useCallback(() => (
    <View className="flex-row justify-between items-center px-4 py-3 bg-[#1C1C1E]">
      <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
        <Ionicons name="menu" size={26} color="white" />
      </TouchableOpacity>
      <Text className="text-accent text-lg font-semibold tracking-wider">GRIND</Text>
      <TouchableOpacity onPress={() => router.push("/(chat)/friendList")}>
        <Ionicons name="chatbubble-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  ), []);

  return (
    <SafeAreaView className="flex-1 bg-[#1C1C1E]">
      {renderHeader()}

      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <View className="mb-5">{item.render()}</View>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
      />

      {/* Sidebar & Blur Overlay */}
      {isSidebarOpen && (
        <>
          <Animated.View
            className="absolute inset-0"
            style={{ opacity: fadeAnim }}
            pointerEvents="auto"
          >
            <BlurView intensity={30} tint="dark" className="absolute inset-0">
              <TouchableOpacity
                className="absolute inset-0"
                onPress={() => setIsSidebarOpen(false)}
                activeOpacity={1}
              />
            </BlurView>
          </Animated.View>

          <Animated.View
            className="absolute top-0 left-0 h-full"
            style={{ width: SIDEBAR_WIDTH, transform: [{ translateX: slideAnim }] }}
            {...panResponder.panHandlers}
          >
            <View className="absolute right-0 top-0 bottom-0 w-5 items-center justify-center z-10">
              <View className="h-12 w-1 bg-white/20 rounded" />
            </View>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
