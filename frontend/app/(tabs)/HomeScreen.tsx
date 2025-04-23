import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  TouchableOpacity, 
  Dimensions, 
  StyleSheet,
  Animated,
  PanResponder
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

import ActivityCarousel from '../components/homepage/ActivityCarousel';
import RatingArenas from '../components/homepage/RatingArenas';
import CategoryGrid from '../components/homepage/CategoryGrid';
import GymList from '../components/homepage/GymList';
import Sidebar from '../components/sideBar';
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get('window');
const SIDEBAR_WIDTH = screenWidth * 0.8;

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  const sections = [
    { key: 'activity', render: () => <ActivityCarousel /> },
    { key: 'rating', render: () => <RatingArenas /> },
    { key: 'category', render: () => <CategoryGrid /> },
    { key: 'gyms', render: () => <GymList /> },
  ];

  // Create pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        // Only respond to horizontal movements
        return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5;
      },
      onPanResponderGrant: () => {
        slideAnim.setOffset(slideAnim._value);
        slideAnim.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Only allow sliding to the left (negative values)
        const newPosition = Math.min(0, gestureState.dx);
        slideAnim.setValue(newPosition);
        
        // Calculate opacity based on position
        const newOpacity = 1 - Math.min(1, Math.abs(newPosition / SIDEBAR_WIDTH) * 1.5);
        fadeAnim.setValue(newOpacity);
      },
      onPanResponderRelease: (evt, gestureState) => {
        slideAnim.flattenOffset();
        
        // If swiped more than 20% of width to the left, close it
        if (gestureState.dx < -SIDEBAR_WIDTH * 0.2) {
          handleCloseSidebar();
        } else {
          // Otherwise snap back to open position
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              friction: 8,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            })
          ]).start();
        }
      }
    })
  ).current;

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
      // Animate sidebar in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else if (isAnimating) {
      // Animate sidebar out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SIDEBAR_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(({ finished }) => {
        if (finished) {
          setIsAnimating(false);
        }
      });
    }
  }, [isSidebarOpen, slideAnim, fadeAnim, isAnimating]);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderContent = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleOpenSidebar}>
          <Ionicons name="menu" size={26} color="white" />
        </TouchableOpacity>
       
    <Animated.Text style={styles.headerTitle}>GRIND</Animated.Text>
 

    <TouchableOpacity onPress={() => router.push("/(chat)/friendList")}>
    <Ionicons name="chatbubble-outline" size={24} color="white" />
  </TouchableOpacity>
      </View>

      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <View style={styles.section}>{item.render()}</View>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      {renderContent()}

      {/* Blur Overlay when Sidebar is open */}
      {(isSidebarOpen || isAnimating) && (
        <Animated.View 
          style={[
            StyleSheet.absoluteFill, 
            { opacity: fadeAnim }
          ]}
          pointerEvents={isSidebarOpen ? 'auto' : 'none'}
        >
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill}>
            <TouchableOpacity 
              style={StyleSheet.absoluteFill}
              onPress={handleCloseSidebar}
              activeOpacity={1}
            />
          </BlurView>
        </Animated.View>
      )}

      {/* Sidebar */}
      {(isSidebarOpen || isAnimating) && (
        <Animated.View 
          style={[
            styles.sidebarContainer,
            { transform: [{ translateX: slideAnim }] }
          ]}
          {...panResponder.panHandlers}
        >
          {/* <View style={styles.swipeIndicator}>
            <View style={styles.swipeIndicatorBar} />
          </View> */}
          <Sidebar onClose={handleCloseSidebar} />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1C1C1E',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: SIDEBAR_WIDTH,
    zIndex: 1001,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  swipeIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1002,
  },
  swipeIndicatorBar: {
    height: 50,
    width: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },

  headerTitleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1, // behind the icons
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 1,
  },
});

export default HomeScreen;