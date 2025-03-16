import { useAuthStore } from "~/store/authStore";
import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, router, Stack, useFocusEffect } from "expo-router";
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://6f6dcf88b984cace9a18c1b462777952@o4508988145467392.ingest.us.sentry.io/4508988147040256',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default Sentry.wrap(function RootLayout() {
  const { token, init } = useAuthStore();
  const queryClient = new QueryClient();

  useEffect(() => {
    init();
  }, []);

  useFocusEffect(() => {
    if (token) {
      router.replace("/(tabs)");
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
});