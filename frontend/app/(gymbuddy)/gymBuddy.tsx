import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  Animated,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const gymBuddies = [
    {
      id: '1',
      name: 'Alex',
      age: 25,
      distance: '2.5 km',
      bio: 'Let’s crush some PRs together. Deadlifts and protein shakes all day!',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc3d1?auto=format&fit=crop&w=800&q=80',
      points: 1200,
      tags: ['Powerlifting', 'Meal Prep', 'Night Owl', 'Beard Goals'],
    },
    {
      id: '2',
      name: 'Jasmine',
      age: 28,
      distance: '1.2 km',
      bio: 'Morning runs + matcha lattes = my vibe 💚',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      points: 980,
      tags: ['Running', 'Yoga', 'Early Bird', 'Music Lover'],
    },
    {
      id: '3',
      name: 'Marco',
      age: 30,
      distance: '3.1 km',
      bio: 'Bulking season 24/7. Let’s get huge 💪',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80',
      points: 1450,
      tags: ['Bodybuilding', 'Meal Prep', 'Leg Day Lover'],
    },
    {
      id: '4',
      name: 'Riya',
      age: 23,
      distance: '500 m',
      bio: 'HIIT, hikes, and smoothies. Gym is my therapy 🧘‍♀️',
      image: 'https://images.unsplash.com/photo-1536148935331-408321065b18?auto=format&fit=crop&w=800&q=80',
      points: 1100,
      tags: ['HIIT', 'Outdoor', 'Smoothie Queen', 'Sunrise Workouts'],
    },
    {
      id: '5',
      name: 'Chris',
      age: 27,
      distance: '4.7 km',
      bio: 'Crossfit is life. Always down to spot a buddy 💥',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      points: 1025,
      tags: ['Crossfit', 'Gym Rat', 'Loud Music', 'Goal-Oriented'],
    },
  ];
  

type GymBuddy = typeof gymBuddies[0];

const tagColors = ['#f87171', '#34d399', '#60a5fa', '#facc15', '#a78bfa'];

const GymBuddyScreen = () => {
  const [index, setIndex] = useState(0);
  const [isOutOfCards, setIsOutOfCards] = useState(false);
  const swiperRef = useRef<Swiper<GymBuddy>>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const likeOpacity = useRef(new Animated.Value(0)).current;
  const nopeOpacity = useRef(new Animated.Value(0)).current;
  const superLikeOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (index >= gymBuddies.length) {
      setIsOutOfCards(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      setIsOutOfCards(false);
      fadeAnim.setValue(0);
    }
  }, [index]);

  const resetOverlays = () => {
    likeOpacity.setValue(0);
    nopeOpacity.setValue(0);
    superLikeOpacity.setValue(0);
  };

  const handleSendRequest = () => {
    if (!isOutOfCards) {
      Animated.sequence([
        Animated.timing(likeOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(150),
      ]).start(() => {
        swiperRef.current?.swipeRight();
      });
    }
  };

  const handleSkip = () => {
    if (!isOutOfCards) {
      Animated.sequence([
        Animated.timing(nopeOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(150),
      ]).start(() => {
        swiperRef.current?.swipeLeft();
      });
    }
  };

  const handleSuperLike = () => {
    if (!isOutOfCards) {
      Animated.sequence([
        Animated.timing(superLikeOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(150),
      ]).start(() => {
        swiperRef.current?.swipeTop();
      });
    }
  };

  const renderCard = (card: GymBuddy) => (
    <View className="rounded-3xl overflow-hidden h-[80%] shadow-lg shadow-black bg-primary" style={styles.cardShadow}>
      <View className="w-full h-[70%] relative">
        <Image source={{ uri: card.image }} className="w-full h-full" resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.95)']}
          className="absolute bottom-0 left-0 right-0 h-40"
        />

        {/* Overlays */}
        <Animated.View style={[styles.overlayTopRight, { opacity: likeOpacity }]}>
          <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.indicatorBorder}>
            <Text style={styles.indicatorText}>FRIEND REQUEST</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.overlayTopLeft, { opacity: nopeOpacity }]}>
          <LinearGradient colors={['#ef4444', '#b91c1c']} style={styles.indicatorBorder}>
            <Text style={styles.indicatorText}>DECLINE</Text>
          </LinearGradient>
        </Animated.View>

        <View className="absolute bottom-4 left-0 right-0 px-5 flex-row justify-between items-end">
          <View>
            <Text className="text-white text-3xl font-bold">{card.name}</Text>
            <Text className="text-neutral-200 text-lg opacity-90">Age: {card.age}</Text>
          </View>
          <View className="bg-black bg-opacity-60 rounded-full px-3 py-1">
            <Text className="text-green-400 text-sm font-semibold">{card.points} pts</Text>
          </View>
        </View>
      </View>

      <View className="p-5">
        <Text className="text-neutral-300 text-base mb-3 italic">"{card.bio}"</Text>

        <View className="flex-row flex-wrap mb-4">
          {card.tags.map((tag:any, idx:any) => (
            <View
              key={tag}
              className="rounded-full px-3 py-1 mr-2 mb-2"
              style={{ backgroundColor: tagColors[idx % tagColors.length] }}
            >
              <Text className="text-black text-xs font-semibold">{tag}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center">
          <Feather name="map-pin" size={16} color="#ef4444" />
          <Text className="text-neutral-400 ml-2 text-sm">{card.distance}</Text>
          <Text className="text-neutral-500 ml-1 text-xs">away</Text>
        </View>
      </View>
    </View>
  );

  const renderNoMoreCards = () => (
    <Animated.View style={{ opacity: fadeAnim }} className="flex-1 justify-center items-center px-8">
      <BlurView intensity={60} tint="dark" className="rounded-3xl w-full p-8 items-center">
        <Text className="text-white text-2xl font-bold mb-2">No More Gym Buddies Nearby</Text>
        <Text className="text-neutral-300 text-center mb-6">
          Try increasing your search radius or check back later.
        </Text>
        <Pressable className="bg-red-500 py-3 px-6 rounded-full w-full items-center" style={styles.buttonShadow}>
          <Text className="text-white font-semibold">Refresh</Text>
        </Pressable>
      </BlurView>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View className="flex-1 relative bg-primary">
        {!isOutOfCards ? (
          <Swiper
            ref={swiperRef}
            cards={gymBuddies}
            cardIndex={index}
            onSwiped={(i) => {
              setIndex(i + 1);
              resetOverlays();
            }}
            onSwipedAll={() => setIsOutOfCards(true)}
            renderCard={renderCard}
            backgroundColor="black"
            stackSize={3}
            stackSeparation={15}
            stackScale={10}
            animateCardOpacity
            verticalSwipe={false}
            cardVerticalMargin={10}
            cardHorizontalMargin={10}
            swipeAnimationDuration={300}
            containerStyle={{ flex: 1 }}
          />
        ) : (
          renderNoMoreCards()
        )}

        {!isOutOfCards && (
          <View className="absolute bottom-8 left-0 right-0 flex-row justify-center items-center space-x-5 z-10 px-4">
            <Pressable
              onPress={handleSkip}
              className="bg-white p-4 rounded-full w-16 h-16 items-center justify-center"
              style={styles.buttonShadow}
            >
              <Feather name="x" size={30} color="#ef4444" />
            </Pressable>

            <Pressable
              onPress={handleSuperLike}
              className="bg-white p-3 rounded-full w-12 h-12 items-center justify-center"
              style={styles.buttonShadow}
            >
              <Feather name="star" size={24} color="#3b82f6" />
            </Pressable>

            <Pressable
              onPress={handleSendRequest}
              className="bg-white p-4 rounded-full w-16 h-16 items-center justify-center"
              style={styles.buttonShadow}
            >
              <Feather name="check" size={30} color="#22c55e" />
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  overlayTopRight: {
    position: 'absolute',
    top: 40,
    right: 20,
    transform: [{ rotate: '12deg' }],
    zIndex: 10,
  },
  overlayTopLeft: {
    position: 'absolute',
    top: 40,
    left: 20,
    transform: [{ rotate: '-12deg' }],
    zIndex: 10,
  },
  indicatorBorder: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  indicatorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default GymBuddyScreen;