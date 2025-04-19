import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleResetPassword = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    // TODO: Add actual password reset logic here (Firebase, API, etc.)
    Alert.alert("Success", "Password reset link sent to your email.");
    router.back(); // Go back to login screen
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-primary px-6 justify-center">
        {/* Header */}
        <Text className="text-white text-4xl font-bold mb-2">Forgot</Text>
        <Text className="text-white text-4xl font-bold mb-6">Password?</Text>

        <Text className="text-gray-400 mb-6">
          Enter your email below and we’ll send you instructions to reset your
          password.
        </Text>

        {/* Email Input */}
        <Text className="text-gray-400 mb-1">EMAIL</Text>
        <View className="flex-row items-center border-b border-gray-700 mb-6 pb-2">
          <Feather name="mail" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            className="ml-2 text-white flex-1"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          className="bg-white py-3 rounded-md mb-6"
          onPress={handleResetPassword}
        >
          <Text className="text-black text-center tracking-widest font-semibold">
            RESET PASSWORD
          </Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white text-center">
            Back to <Text className="text-red-500">Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
