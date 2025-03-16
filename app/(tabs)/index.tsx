import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppLogo from "../../assets/app-logo.svg";

import PotHoleList from "~/components/PotHoleList";
import images from "~/constants/images";
import { useThemeStore } from "~/store/themeStore";
import { usePotHoleStore } from "~/store/potholeStore";

export default function Home() {
 

  const { getPotholes } = usePotHoleStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    getPotholes();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1">
        <SafeAreaView edges={["top"]} className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <View className="w-full flex items-center flex-1">
            <View className="pb-12">
              <AppLogo className="w-32 h-32" />
            </View>
            <ScrollView className="flex-1 ">
              <PotHoleList
                id="1"
                image={images.pothole}
                text="Pothole on this road"
              />
              <PotHoleList
                id="1"
                image={images.pothole}
                text="Pothole on this road"
              />
              <PotHoleList
                id="1"
                image={images.pothole}
                text="Pothole on this road"
              />
              <PotHoleList
                id="1"
                image={images.pothole}
                text="Pothole on this road"
              />
              <PotHoleList
                id="1"
                image={images.pothole}
                text="Pothole on this road"
              />
              <PotHoleList
                id="1"
                image={images.pothole}
                text="Pothole on this road"
              />
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
