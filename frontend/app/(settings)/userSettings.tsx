import React, { useState } from "react";
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Slider from "@react-native-community/slider";
import {
  Feather,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

// Enable LayoutAnimation on Android
if (Platform.OS === "android")
  UIManager.setLayoutAnimationEnabledExperimental?.(true);

const interestsList = [
  "Running/Jogging",
  "Weightlifting",
  "Yoga",
  "Cycling",
  "Swimming",
  "Crossfit",
  "Zumba",
  "Home Workout",
  "Powerlifting",
  "HIIT",
  "Dance",
  "Hiking",
  "Meditation",
  "Gymnastics",
  "Athletes",
];

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [distance, setDistance] = useState(10);
  const [discovery, setDiscovery] = useState(false);
  const [showMe, setShowMe] = useState<"Men" | "Women" | "Both">("Men");
  const [gymLevel, setGymLevel] = useState<"Beginner" | "Intermediate" | "Professional">("Beginner");
  const [interests, setInterests] = useState<string[]>([]);

  const [expanded, setExpanded] = useState({
    distance: false,
    showMe: false,
    gymLevel: false,
    interest: false,
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const toggleExpand = (key: keyof typeof expanded) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests(interests.filter((i) => i !== tag));
    } else if (interests.length < 5) {
      setInterests([...interests, tag]);
    }
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView className="flex-1 bg-primary px-4 py-6">
      <View className="flex-row items-center mb-6">
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
    <Text className="text-white text-2xl font-bold ml-4">Settings</Text>
  </View>

        {/* Profile Photo */}
        <View className="flex-row items-center justify-between mb-6 bg-[#1E1E1E] px-4 py-4 rounded-xl">
          <View>
            <Text className="text-white text-lg font-semibold">Ayush Verma</Text>
            <TouchableOpacity onPress={() => alert("Navigate to Edit Profile")}>
              <Text className="text-red-500 mt-1">Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View className="relative">
            <Image
              source={
                profileImage || "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" }

                style={{ width: 80, height: 80, borderRadius: 40 }}

            />
            <TouchableOpacity
              onPress={pickImage}
              className="absolute bottom-0 right-0 bg-black p-1 rounded-full border border-white"
            >
              <Entypo name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Distance */}
        <TouchableOpacity
          className="bg-[#1E1E1E] p-4 rounded-2xl mb-4"
          onPress={() => toggleExpand("distance")}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <Feather name="map-pin" size={18} color="white" />
              <Text className="text-white font-semibold">
                Edit Distance Radius
              </Text>
            </View>
            <Ionicons
              name={expanded.distance ? "chevron-up" : "chevron-down"}
              size={20}
              color="gray"
            />
          </View>
          {expanded.distance && (
            <View className="mt-4">
              <Text className="text-gray-400 mb-2">
                Current Distance: {distance} kms
              </Text>
              <Slider
                minimumValue={1}
                maximumValue={50}
                step={1}
                value={distance}
                onValueChange={setDistance}
                minimumTrackTintColor="#ef4444"
                maximumTrackTintColor="#6b7280"
                thumbTintColor="#fff"
              />
              <TouchableOpacity
                className="mt-2"
                onPress={() => alert(`Distance saved: ${distance} kms`)}
              >
                <Text className="text-red-400 font-semibold">Save Changes</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        {/* Show Me */}
        <TouchableOpacity
          className="bg-[#1E1E1E] p-4 rounded-2xl mb-4"
          onPress={() => toggleExpand("showMe")}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <Feather name="user" size={18} color="white" />
              <Text className="text-white font-semibold">Show Me</Text>
            </View>
            <Ionicons
              name={expanded.showMe ? "chevron-up" : "chevron-down"}
              size={20}
              color="gray"
            />
          </View>
          {expanded.showMe && (
            <View className="mt-4">
              {["Men", "Women", "Both"].map((option) => (
                <TouchableOpacity
                  key={option}
                  className="flex-row justify-between py-2"
                  onPress={() => setShowMe(option as any)}
                >
                  <Text className="text-white">{option}</Text>
                  {showMe === option && (
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color="#ef4444"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Gym Buddy Level */}
        <TouchableOpacity
          className="bg-[#1E1E1E] p-4 rounded-2xl mb-4"
          onPress={() => toggleExpand("gymLevel")}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <FontAwesome5 name="dumbbell" size={16} color="white" />
              <Text className="text-white font-semibold">Level of Gym Buddy</Text>
            </View>
            <Ionicons
              name={expanded.gymLevel ? "chevron-up" : "chevron-down"}
              size={20}
              color="gray"
            />
          </View>
          {expanded.gymLevel && (
            <View className="mt-4">
              {["Beginner", "Intermediate", "Professional"].map((level) => (
                <TouchableOpacity
                  key={level}
                  className="flex-row justify-between py-2"
                  onPress={() => setGymLevel(level as any)}
                >
                  <Text className="text-white">{level}</Text>
                  {gymLevel === level && (
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color="#ef4444"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Interests */}
        <TouchableOpacity
          className="bg-[#1E1E1E] p-4 rounded-2xl mb-4"
          onPress={() => toggleExpand("interest")}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="interests" size={20} color="white" />
              <Text className="text-white font-semibold">Interests</Text>
            </View>
            <Ionicons
              name={expanded.interest ? "chevron-up" : "chevron-down"}
              size={20}
              color="gray"
            />
          </View>
          {expanded.interest && (
            <View className="mt-4">
              <View className="flex flex-row flex-wrap">
                {interestsList.map((tag) => {
                  const isSelected = interests.includes(tag);
                  return (
                    <TouchableOpacity
                      key={tag}
                      className={`px-3 py-1 mr-2 mb-2 rounded-full border ${
                        isSelected
                          ? "bg-red-600 border-red-600"
                          : "border-gray-500"
                      }`}
                      onPress={() => toggleInterest(tag)}
                    >
                      <Text className="text-white text-sm">{tag}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text className="text-gray-500 text-xs mt-2">
                Max 5 interests. Selected: {interests.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Discovery Toggle */}
        <View className="bg-[#1E1E1E] p-4 rounded-2xl mb-12">
          <Text className="text-white font-semibold text-base">
            ENABLE DISCOVERY
          </Text>
          <Text className="text-gray-400 text-sm mt-1 mb-3">
            Enabling discovery will give you access to explore buddies and gyms
            near your location
          </Text>
          <Switch
            value={discovery}
            onValueChange={setDiscovery}
            thumbColor={discovery ? "#ef4444" : "#f4f3f4"}
            trackColor={{ false: "#6b7280", true: "#ef444440" }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
