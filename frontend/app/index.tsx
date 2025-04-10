import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-red-500">TESTing</Text>
      <Link href="/login">Login</Link>
      <Link href= "/(onboarding)/welcome">Welcome</Link>
    </View>
  );
}
