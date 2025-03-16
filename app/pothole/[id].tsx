import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppLogo from "../../assets/app-logo.svg";

import images from "~/constants/images";
import { useThemeStore } from "~/store/themeStore";
import { usePotHoleStore } from "~/store/potholeStore";
export default function PotholeDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { isDarkMode } = useThemeStore();
  const { rate } = usePotHoleStore();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <View className="w-full items-center">
          <View className="w-full flex-row items-center px-4 py-2 ">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
            </TouchableOpacity>
              <Text className={`ml-4 text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              Pothole Details
            </Text>
          </View>
          <AppLogo className="w-32 h-32" />
        </View>

        <View className="mx-6 my-4 items-center p-2 bg-white rounded-xl shadow-lg elevation-lg overflow-hidden">
          <Text className="mt-4 text-2xl text-center font-bold pb-8">
            Barbican Road
          </Text>
          <Image
            source={images.pothole}
            resizeMode="contain"
            className=" h-2/6 rounded-lg"
          />

          <Text className="mt-4 text-2xl text-center font-bold">
            Description
          </Text>
          <Text className="mt-4 text-xl text-center px-12">
            This pothole right infront of the KFC.
          </Text>
          <Text className="mt-4 text-2xl text-center font-bold pt-8">
            Danger Level
          </Text>
          <View className="bg-yellow-300 w-12  h-12 m-2 items-center, justify-center">
            <Text className="text-center text-2xl">3</Text>
          </View>
          <View className="pt-6 flex-row items-center justify-end w-full align-baseline">
            <Text className="text-2xl pr-4">27</Text>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="thumbs-up-outline" size={32} />
            </TouchableOpacity>
            <View className="h-8 w-[2] bg-black mx-3" />
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="thumbs-down-outline" size={32} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
