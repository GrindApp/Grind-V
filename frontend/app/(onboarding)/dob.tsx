import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DOBScreen = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const formattedDate = date
    ? `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`
    : "";

  const isValid = !!date;

  const handleNext = () => {
    if (isValid) {
      router.push("/gender");
    } else {
      alert("Please select your date of birth.");
    }
  };

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <Text className="text-white text-2xl font-bold mb-6">
        When's your birthday?
      </Text>

      <TouchableOpacity
        className="bg-[#1F1F1F] text-white px-4 py-3 rounded-lg mb-6"
        onPress={() => setShowPicker(true)}
      >
        <Text className={`text-white ${formattedDate ? "" : "text-gray-500"}`}>
          {formattedDate || "Select your date of birth"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePickerModal
          isVisible={showPicker}
          mode="date"
          onConfirm={(selectedDate) => handleDateChange(null, selectedDate)}
          onCancel={() => setShowPicker(false)}
          maximumDate={new Date()}
        />
      )}

      <TouchableOpacity
        className={`py-3 rounded-lg ${isValid ? "bg-white" : "bg-gray-700"}`}
        onPress={handleNext}
        disabled={!isValid}
      >
        <Text
          className={`text-center font-semibold ${
            isValid ? "text-black" : "text-gray-400"
          }`}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DOBScreen;
