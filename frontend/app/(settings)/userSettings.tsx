
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
  } from "react-native";
import React, { useState } from "react";
import SettingRow from "./components/SettingRow"
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";

const userSettings = () => {
    const [bioModalVisible, setBioModalVisible] = useState(false);
    const [bio, setBio] = useState("");
  
    const [preference, setPreference] = useState("Both");
  
    const [radius, setRadius] = useState(10);
  
    return (
      <ScrollView className="bg-primary flex-1 px-4">
        {/* Profile */}
        <View className="items-center mt-10 mb-6">
          <TouchableOpacity onPress={() => console.log("Edit profile picture")}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              className="w-24 h-24 rounded-full mb-2"
            />
            <Text className="text-indigo-400 text-sm">Edit Profile Picture</Text>
          </TouchableOpacity>
        </View>
  
        {/* Setting Options */}
        <SettingRow label="Edit Bio" onPress={() => setBioModalVisible(true)} />
        <SettingRow
          label={`Preference: ${preference}`}
          onPress={() =>
            setPreference((prev) =>
              prev === "Men" ? "Women" : prev === "Women" ? "Both" : "Men"
            )
          }
        />
        <View>
          <Text className="text-white text-base mt-4 mb-2">Radius: {radius} km</Text>
          <Slider
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={radius}
            onValueChange={setRadius}
            minimumTrackTintColor="#60A5FA"
            maximumTrackTintColor="#3B3B3B"
          />
        </View>
  
        {/* Modal for Bio Editing */}
        <Modal visible={bioModalVisible} animationType="slide" transparent={true}>
          <View className="flex-1 justify-center items-center bg-black bg-opacity-60 px-6">
            <View className="bg-gray-800 p-6 rounded-xl w-full">
              <Text className="text-white text-lg mb-2">Edit Bio</Text>
              <TextInput
                multiline
                value={bio}
                onChangeText={setBio}
                placeholder="Type your bio..."
                placeholderTextColor="#9CA3AF"
                className="text-white border border-gray-600 p-3 rounded-md mb-4 h-32"
              />
              <Button title="Save" onPress={() => setBioModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  };
  
  export default userSettings;