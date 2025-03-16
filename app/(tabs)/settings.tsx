import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { View, Text, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppLogo from "../../assets/app-logo.svg";

import { Button } from "~/components/Button";
import { useAuthStore } from "~/store/authStore";
import { useThemeStore } from "~/store/themeStore";
import { DangerLevelDropdown } from "~/components/DangerLevelDropdown";

export default function SettingsScreen() {
  const { logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [selectedDangerLevel, setSelectedDangerLevel] = useState(3);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <View className="w-full items-center">
          <AppLogo className="w-32 h-32" />
        </View>

        <View className="flex-row w-full justify-between p-8">
          <Text
            className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Dark Mode
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>

        <DangerLevelDropdown
          selectedLevel={selectedDangerLevel}
          onSelect={setSelectedDangerLevel}
          />
          
       
        <Button
          title="Logout"
          className="mt-auto bg-red-500 mx-8 rounded-xl mb-8"
          onPress={() => {
            logout();
            router.dismissTo("/landing");
          }}
        />
      </SafeAreaView>
    </>
  );
}
