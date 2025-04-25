import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  Animated,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import Swiper from 'react-native-deck-swiper';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const gymBuddies = [
  {
    id: '1',
    name: 'Alex',
    age: 25,
    distance: '2.5 km',
    bio: `Let's crush some PRs together. Deadlifts and protein shakes all day!`,
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
    bio: `Bulking season 24/7. Let's get huge 💪`,
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

const tagColors = {
  Powerlifting: '#f87171',
  'Meal Prep': '#34d399',
  'Night Owl': '#60a5fa',
  'Beard Goals': '#facc15',
  Running: '#a78bfa',
  Yoga: '#fb923c',
  'Early Bird': '#38bdf8',
  'Music Lover': '#fb7185',
  Bodybuilding: '#4ade80',
  'Leg Day Lover': '#a3e635',
  HIIT: '#2dd4bf',
  Outdoor: '#f472b6',
  'Smoothie Queen': '#c084fc',
  'Sunrise Workouts': '#facc15',
  Crossfit: '#94a3b8',
  'Gym Rat': '#fbbf24',
  'Loud Music': '#a855f7',
  'Goal-Oriented': '#10b981',
};

const GymBuddyScreen = () => {
  const [index, setIndex] = useState(0);
  const [isOutOfCards, setIsOutOfCards] = useState(false);
  const swiperRef = useRef<Swiper<GymBuddy>>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const likeOpacity = useRef(new Animated.Value(0)).current;
  const nopeOpacity = useRef(new Animated.Value(0)).current;

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

  const handleReject = () => {
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

  const renderCard = (card: GymBuddy) => (
    <View style={styles.card}>
      <View style={styles.cardImageContainer}>
        <Image
          source={card.image}
          style={styles.cardImage}
          contentFit="cover"
          transition={300}
        />
        
        {/* Overlay Indicators */}
        <Animated.View style={[styles.overlayRequest, { opacity: likeOpacity }]}>
          <View style={styles.requestIndicator}>
            <Text style={styles.indicatorText}>REQUEST</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.overlayReject, { opacity: nopeOpacity }]}>
          <View style={styles.rejectIndicator}>
            <Text style={styles.indicatorText}>REJECT</Text>
          </View>
        </Animated.View>

        {/* Top Fitness Points Badge */}
        <View style={styles.pointsBadge}>
          <LinearGradient 
            colors={['#22c55e', '#16a34a']} 
            style={styles.pointsGradient}
          >
            <Feather name="award" size={14} color="#fff" />
            <Text style={styles.pointsText}>{card.points}</Text>
          </LinearGradient>
        </View>

        {/* Card Info Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
          style={styles.cardGradient}
        >
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{card.name}</Text>
            <Text style={styles.ageText}>{card.age}</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={14} color="#ef4444" />
            <Text style={styles.distanceText}>{card.distance} away</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.cardContent}>
        {/* Bio Section */}
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>{card.bio}</Text>
        </View>

        {/* Tags Section */}
        <View style={styles.tagsContainer}>
          {card.tags.map((tag) => (
            <View
              key={tag}
              style={[
                styles.tagBadge,
                { backgroundColor: tagColors[tag as keyof typeof tagColors] || '#60a5fa' }
              ]}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderNoMoreCards = () => (
    <Animated.View style={[styles.noMoreCardsContainer, { opacity: fadeAnim }]}>
      <BlurView intensity={80} tint="dark" style={styles.blurView}>
        <Feather name="users" size={50} color="#ef4444" style={styles.noCardIcon} />
        <Text style={styles.noMoreCardsTitle}>No More Gym Buddies</Text>
        <Text style={styles.noMoreCardsText}>
          We've run out of potential gym buddies in your area. Expand your search radius or check back later!
        </Text>
        <Pressable style={styles.refreshButton}>
          <LinearGradient colors={['#ef4444', '#b91c1c']} style={styles.refreshGradient}>
            <Text style={styles.refreshText}>Refresh</Text>
          </LinearGradient>
        </Pressable>
      </BlurView>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GymMatch</Text>
        <Feather name="sliders" size={22} color="#fff" />
      </View>
      
      <View style={styles.content}>
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
            backgroundColor="transparent"
            stackSize={3}
            stackSeparation={15}
            stackScale={10}
            animateCardOpacity
            verticalSwipe={false}
            cardVerticalMargin={15}
            cardHorizontalMargin={0}
            swipeAnimationDuration={300}
            containerStyle={styles.swiperContainer}
            overlayLabels={{}}
          />
        ) : (
          renderNoMoreCards()
        )}

        {/* Action Buttons */}
        {!isOutOfCards && (
          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={handleReject}
              style={styles.rejectButton}
            >
              <LinearGradient
                colors={['#ef4444', '#b91c1c']}
                style={styles.buttonGradient}
              >
                <Feather name="x" size={30} color="#fff" />
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={handleSendRequest}
              style={styles.requestButton}
            >
              <LinearGradient
                colors={['#22c55e', '#16a34a']}
                style={styles.buttonGradient}
              >
                <Feather name="check" size={30} color="#fff" />
              </LinearGradient>
            </Pressable>
          </View>
        )}
      </View>
      
      {/* Bottom Progress Bar */}
      {!isOutOfCards && (
        <View style={styles.progressContainer}>
          {gymBuddies.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.progressDot,
                i === index ? styles.progressDotActive : null
              ]} 
            />
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    height: '90%',
    borderRadius: 24,
    backgroundColor: '#1e1e1e',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  cardImageContainer: {
    height: '70%',
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    paddingHorizontal: 20,
    paddingBottom: 12,
    justifyContent: 'flex-end',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  ageText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 5,
  },
  cardContent: {
    padding: 16,
    flex: 1,
  },
  bioContainer: {
    marginBottom: 14,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  rejectButton: {
    shadowColor: '#b91c1c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  requestButton: {
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  pointsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pointsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
  overlayRequest: {
    position: 'absolute',
    top: '40%',
    right: 30,
    transform: [{ rotate: '12deg' }],
    zIndex: 10,
  },
  overlayReject: {
    position: 'absolute',
    top: '40%',
    left: 30,
    transform: [{ rotate: '-12deg' }],
    zIndex: 10,
  },
  requestIndicator: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  rejectIndicator: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  indicatorText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  noMoreCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  blurView: {
    width: '100%',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  noCardIcon: {
    marginBottom: 16,
  },
  noMoreCardsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  noMoreCardsText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  refreshButton: {
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, 
    shadowRadius: 5,
    elevation: 6,
  },
  refreshGradient: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#ef4444',
    width: 16,
  },
});

export default GymBuddyScreen;