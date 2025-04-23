import React, { useState } from "react";
import { Image } from 'expo-image';

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
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";

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
    } else {
      alert("You can select up to 5 interests only");
    }
  };

  const settingsOptions = [
    {
      key: "distance",
      title: "Edit Distance Radius",
      icon: <Feather name="map-pin" size={18} color="#FF3B30" />,
      content: (
        <View className="mt-5 px-1">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-300 text-sm">Current Distance</Text>
            <Text className="text-white font-medium">{distance} kms</Text>
          </View>
          <Slider
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor="#FF3B30"
            maximumTrackTintColor="#3A3A3C"
            thumbTintColor="#FF3B30"
            className="my-2"
          />
          <View className="flex-row justify-between">
            <Text className="text-gray-400 text-xs">1 km</Text>
            <Text className="text-gray-400 text-xs">50 km</Text>
          </View>
          <TouchableOpacity
            className="mt-5 bg-red-600 py-3 rounded-xl"
            onPress={() => alert(`Distance saved: ${distance} kms`)}
          >
            <Text className="text-white font-semibold text-center">Save Changes</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      key: "showMe",
      title: "Show Me",
      icon: <Feather name="users" size={18} color="#FF3B30" />,
      content: (
        <View className="mt-3">
          {["Men", "Women", "Both"].map((option) => (
            <TouchableOpacity
              key={option}
              className={`flex-row justify-between py-3 px-2 mb-1 rounded-lg ${
                showMe === option ? "bg-[#2C2C2E]" : ""
              }`}
              onPress={() => setShowMe(option as any)}
            >
              <Text className="text-white">{option}</Text>
              {showMe === option && (
                <MaterialIcons
                  name="check-circle"
                  size={20}
                  color="#FF3B30"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
    {
      key: "gymLevel",
      title: "Level of Gym Buddy",
      icon: <FontAwesome5 name="dumbbell" size={16} color="#FF3B30" />,
      content: (
        <View className="mt-3">
          {["Beginner", "Intermediate", "Professional"].map((level) => (
            <TouchableOpacity
              key={level}
              className={`flex-row justify-between py-3 px-2 mb-1 rounded-lg ${
                gymLevel === level ? "bg-[#2C2C2E]" : ""
              }`}
              onPress={() => setGymLevel(level as any)}
            >
              <Text className="text-white">{level}</Text>
              {gymLevel === level && (
                <MaterialIcons
                  name="check-circle"
                  size={20}
                  color="#FF3B30"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
    {
      key: "interest",
      title: "Interests",
      icon: <MaterialIcons name="interests" size={20} color="#FF3B30" />,
      content: (
        <View className="mt-4">
          <View className="flex flex-row flex-wrap">
            {interestsList.map((tag) => {
              const isSelected = interests.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  className={`px-4 py-2 mr-2 mb-3 rounded-full ${
                    isSelected
                      ? "bg-red-600"
                      : "bg-[#2C2C2E]"
                  }`}
                  onPress={() => toggleInterest(tag)}
                >
                  <Text className={`text-sm ${isSelected ? "text-white font-medium" : "text-gray-300"}`}>{tag}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View className="flex-row items-center mt-2 mb-1">
            <Text className="text-gray-400 text-xs">
              Selected: {interests.length}/5
            </Text>
            {interests.length === 5 && (
              <Text className="text-red-500 text-xs ml-2">
                Maximum limit reached
              </Text>
            )}
          </View>
        </View>
      ),
    },
  ];

  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView className="flex-1 px-5 py-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-white text-2xl font-bold">Settings</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="logout" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="flex-row items-center justify-between mb-8 bg-[#1C1C1E] px-5 py-5 rounded-2xl">
          <View>
            <Text className="text-white text-xl font-semibold">Ayush Verma</Text>
            <Text className="text-gray-400 text-sm mt-1">ayush@example.com</Text>
            <TouchableOpacity 
              className="mt-3 flex-row items-center" 
              onPress={() => router.push("/(settings)/EditProfileScreen")}
            >
              <Text className="text-red-500 font-medium">Edit Profile</Text>
              <Feather name="chevron-right" size={16} color="#FF3B30" className="ml-1" />
            </TouchableOpacity>
          </View>

          <View className="relative">
            <Image
              source={
                profileImage || "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
              }
              style={{ width: 90, height: 90, borderRadius: 45 }}
              className="border-2 border-red-500"
            />
            <TouchableOpacity
              onPress={pickImage}
              className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full"
            >
              <Entypo name="camera" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Options */}
        {settingsOptions.map((option) => (
          <View key={option.key} className="mb-5">
            <TouchableOpacity
              className="bg-[#1C1C1E] p-5 rounded-2xl"
              onPress={() => toggleExpand(option.key as keyof typeof expanded)}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  {option.icon}
                  <Text className="text-white font-medium text-base">
                    {option.title}
                  </Text>
                </View>
                <View className="bg-[#2C2C2E] p-1 rounded-full">
                  <Ionicons
                    name={expanded[option.key as keyof typeof expanded] ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#FF3B30"
                  />
                </View>
              </View>
              {expanded[option.key as keyof typeof expanded] && option.content}
            </TouchableOpacity>
          </View>
        ))}

        {/* Discovery Toggle */}
        <View className="bg-[#1C1C1E] p-5 rounded-2xl mb-10">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-white font-medium text-base">
                ENABLE DISCOVERY
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                See buddies and gyms near your location
              </Text>
            </View>
            <Switch
              value={discovery}
              onValueChange={setDiscovery}
              thumbColor={discovery ? "#fff" : "#f4f3f4"}
              trackColor={{ false: "#3A3A3C", true: "#FF3B30" }}
              ios_backgroundColor="#3A3A3C"
              className="ml-2"
            />
          </View>
          
          {discovery && (
            <View className="mt-3 bg-[#2C2C2E] px-4 py-3 rounded-xl">
              <Text className="text-gray-300 text-sm">
                Discovery is enabled. You can now explore buddies and gyms within {distance} kms of your location.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;