import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View className="flex-1 bg-primary px-6 justify-center">
      {/* Header */}
      <Text className="text-white text-5xl font-extrabold">Welcome</Text>
      <Text className="text-white text-5xl font-extrabold">to GRIND</Text>

      {/* Banner */}
      <Image
        source={{ uri: "https://your-banner-image-url.com/image.png" }}
        className="w-full h-32 my-4 rounded-lg"
        resizeMode="cover"
      />

      <Text className="text-gray-400 mb-6">
        Please fill the below details to get started
      </Text>

      {/* Email */}
      <Text className="text-gray-400 mb-1">EMAIL</Text>
      <View className="flex-row items-center border-b border-gray-700 mb-4 pb-2">
        <Feather name="mail" size={18} color="#9CA3AF" />
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#6B7280"
          className="ml-2 text-white flex-1"
        />
      </View>

      {/* Password */}
      <Text className="text-gray-400 mb-1">PASSWORD</Text>
      
      <View className="flex-row items-center border-b border-gray-700 mb-2 pb-2">
        <Feather name="lock" size={18} color="#9CA3AF" />
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#6B7280"
          secureTextEntry={!showPassword}
          className="ml-2 text-white flex-1"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={18}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>
    
     

      <Text className="text-sm text-gray-400 mb-6">
        Have you forgotten your password?{" "}
        <Link href= "/components/ForgotPassword">
        <Text className="text-red-500">Click here</Text>
        </Link>
        
      </Text>

      {/* Login Button */}
      <TouchableOpacity className="border border-white py-3 rounded-md mb-4">
        {/* <Text className="text-white text-center tracking-widest">LOG IN</Text> */}
        <Link className="text-white text-center tracking-widest" href="/(settings)/userSettings">Log In</Link>
      </TouchableOpacity>

      <Text className="text-white text-center mb-4">
        Don’t have an account? <Text className="text-red-500">Sign up</Text>
      </Text>

      {/* Divider */}
      <View className="flex-row items-center justify-center mb-4">
        <View className="h-px flex-1 bg-gray-700" />
        <Text className="text-gray-500 px-2">or</Text>
        <View className="h-px flex-1 bg-gray-700" />
      </View>

      {/* Social Login */}
      <TouchableOpacity className="flex-row items-center justify-center bg-[#1F1F1F] py-3 rounded-md mb-3">
        <FontAwesome name="google" size={18} color="white" />
        <Text className="text-white ml-2">Login with Google</Text>
      </TouchableOpacity>

      <Link href="/phone_login" asChild>
        <TouchableOpacity className="flex-row items-center justify-center border border-gray-700 py-3 rounded-md">
          <Feather name="phone" size={18} color="white" />
          <Text className="text-white ml-2">Login with phone</Text>
        </TouchableOpacity>
      </Link>

      {/* Terms */}
      <Text className="text-gray-500 text-xs text-center mt-6">
        By creating an account, you are agreeing to our{" "}
        <Text className="underline">Terms & Conditions</Text> and{" "}
        <Text className="underline">Privacy Policy!</Text>
      </Text>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
