import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect, router, Tabs } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

import { HeaderButton } from "../../components/HeaderButton";
import { TabBarIcon } from "../../components/TabBarIcon";

import { useAuthStore } from "~/store/authStore";
import { useThemeStore } from "~/store/themeStore";
export default function TabLayout() {
  const { token } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  if (!token) {
    return <Redirect href="/landing" />;
  }


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? "white" : "black",
        tabBarInactiveTintColor: isDarkMode ? "white" : "grey",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#111827" : "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="action"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-circle" color={color} />
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/addModal");
          },
        })}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
