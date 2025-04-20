import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500">TESTing</Text>
      <Link href="/login">Login</Link>
      <Link href={"/(onboarding)/welcome"}>Welcome</Link>
      <Link href={"/(settings)/userSettings"}>ProfileEdit</Link>
      <Link href={"/(tabs)/HomeScreen"}>Home</Link>
      <Link href={"/(tabs)/gymProfile"}>Gym</Link>
      <Link href={"/(tabs)/(gymbuddy)/gymBuddy"}>GymBuddy</Link>
      <Link href={"/(tabs)/(exercise)/exerciseOverviewScreen"}>Exercise</Link>
      <Link href={"/(tabs)/(exercise)/exercise-details"}>Exercise Detail</Link>
      <Link href={"/(tabs)/(exercise)/exercise-details"}>Explore</Link>
      <Link href={"/(chat)/friendList"}>Friends</Link>
      <Link href={"/(chat)/chatPage"}>Chat</Link>
    </View>
  );
}