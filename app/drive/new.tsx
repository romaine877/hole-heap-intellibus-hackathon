import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppLogo from "~/assets/app-logo.svg";
import { Button } from "~/components/Button";
import { useThemeStore } from "~/store/themeStore";
export default function NewDrive() {
  const { isDarkMode } = useThemeStore();
  const handleEndDrive = () => {
    router.push("/");
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView
        edges={["top"]}
        className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <View className="w-full flex-row items-center px-4 py-2 ">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
          <Text
            className={`ml-4 text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Pothole Details
          </Text>
        </View>
        <View className="w-full items-center">
          <AppLogo className="w-32 h-32" />
        </View>
        <View className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <View className="rounded-full m-12 p-4 shadow-lg elevation-lg bg-yellow-400 items-center justify-center overflow-hidden">
            <Text className="text-2xl font-bold">Drive Safely</Text>
          </View>
          <View className="flex-1 items-center justify-center p-8 m-12">
            <Text
              className={`text-2xl font-bold  text-center ${isDarkMode ? "text-white" : "text-black"}`}
            >
              No new Pothole alerts for this drive
            </Text>
          </View>

          <Button
            title="Report a Pothole"
            className="mt-auto bg-gray-950 mx-8 rounded-xl mb-8"
            onPress={() => {
              router.push("/pothole/new");
            }}
          />
          <Button
            title="End Drive"
            className="mt-auto bg-gray-950 mx-8 rounded-xl mb-8"
            onPress={() => {
              handleEndDrive();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
