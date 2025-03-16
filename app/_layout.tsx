import { useAuthStore } from "~/store/authStore";
import "../global.css";

import { Redirect, router, Stack, useFocusEffect } from "expo-router";
import { useEffect } from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { token, init, } = useAuthStore();

  useEffect(() => {
    init();

  }, []);

  useFocusEffect(() => {
    if (token) {

      router.replace("/(tabs)");
    }
  });

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="pothole" options={{ headerShown: false }} />

      <Stack.Screen
        name="addModal"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
