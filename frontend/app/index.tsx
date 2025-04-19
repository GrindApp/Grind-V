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
      <Link href={"/(gym)/gymProfile"}>Gym</Link>
      <Link href={"/(gymbuddy)/gymBuddy"}>GymBuddy</Link>
      <Link href={"/(exercise)/exerciseOverviewScreen"}>Exercise</Link>
      <Link href={"/(exercise)/exercise-details"}>Exercise Detail</Link>
      <Link href={"/(exercise)/explore"}>Explore</Link>
      <Link href={"/(chat)/friendList"}>Friends</Link>
      <Link href={"/(chat)/chatPage"}>Chat</Link>
    </View>
  );
}