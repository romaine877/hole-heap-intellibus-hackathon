import { router, Stack } from "expo-router";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Button } from "~/components/Button";

import { ScreenContent } from "~/components/ScreenContent";
import { useAuthStore } from "~/store/authStore";
import AppLogo from "../../assets/app-logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import images from "~/constants/images";
import PotHoleList from "~/components/PotHoleList";

export default function Home() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    router.dismissTo("/landing");
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1">

    
        <SafeAreaView edges={['top']} className="flex-1">
          <View className="w-full flex items-center flex-1">
            <View className="pb-12">
              <AppLogo className="w-32 h-32" />
            </View>
        <ScrollView
         className="flex-1 ">
            <PotHoleList id="1" image={images.pothole} text="Pothole on this road" />
            <PotHoleList id="1" image={images.pothole} text="Pothole on this road" />
            <PotHoleList id="1" image={images.pothole} text="Pothole on this road" />
            <PotHoleList id="1" image={images.pothole} text="Pothole on this road" />
            <PotHoleList id="1" image={images.pothole} text="Pothole on this road" />
            <PotHoleList id="1" image={images.pothole} text="Pothole on this road" />
          </ScrollView>
          </View>
          {/* <Button
            className="bg-black rounded-md"
            onPress={handleLogout}
            title={"logout"}
          /> */}
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
